OUTPUT=publish

RECESS = recess
UGLIFY = node_modules/uglify-js/bin/uglifyjs
S3CMD = s3cmd

S3DIR = mobile-test

CSS_FILES = $(wildcard css/*.css css/**/*.css)
JS_FILES = $(wildcard js/*.js)

all: build
.PHONY: all

$(OUTPUT):
	mkdir -p $(OUTPUT)
$(OUTPUT)/css:
	mkdir -p $(OUTPUT)/css
$(OUTPUT)/js:
	mkdir -p $(OUTPUT)/js

minify: minify-css minify-js

CSS_MINIFIED = $(patsubst %.css,$(OUTPUT)/%.css,$(CSS_FILES))
JS_MINIFIED = $(patsubst %.js,$(OUTPUT)/%.js,$(JS_FILES))

minify-css: $(OUTPUT)/css $(CSS_FILES) $(CSS_MINIFIED)

minify-js: $(OUTPUT)/js $(JS_FILES) $(JS_MINIFIED)

$(OUTPUT)/css/%.css: css/%.css
	@echo 'Minifying $<'
	$(RECESS) --compress $< >$@
	@echo

$(OUTPUT)/js/%.js: js/%.js
	@echo 'Minifying $<'
	$(UGLIFY) $< >$@
	@echo

.PHONY: copy
copy:
	mkdir -p $(OUTPUT)
	cp *.html $(OUTPUT)/
	mkdir -p $(OUTPUT)/img
	cp -r img/* $(OUTPUT)/img/
	mkdir -p $(OUTPUT)/js/lib
	cp -r js/lib/* $(OUTPUT)/js/lib/

build: $(OUTPUT) minify copy
.PHONY: build

.PHONY: clean
clean:
	rm -rf $(OUTPUT)

.PHONY: deploy
deploy:
	# Use the dev settings
	cp $(OUTPUT)/js/settings.remote.js $(OUTPUT)/js/settings.js

	# The trailing slash on the local directory is important, so that we sync the
	# contents of the directory and not the directory itself.  
	$(S3CMD) sync $(OUTPUT)/ s3://locald/web/$(S3DIR)/
