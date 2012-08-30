describe("The API tools", function() {


  it("should exist", function() {
    expect(NSB.API);
  });
  
  it("should return a the correct survey API URL", function() {
    url = NSB.API.getSurveyURL();
    expect(url).toBe("http://example.com/surveys/test-survey-id");
  });
  
  it("should return a the correct URL for getting the responses by parcel", function() {
    url = NSB.API.getParcelDataURL('test-parcel-id');
    expect(url).toBe("http://example.com/surveys/test-survey-id/parcels/test-parcel-id/responses");
  });
  
  it("should correctly parse data from the parcel API", function() {
    var fake_data = [
      "20005579-83              ", 
      "48209      ", 
      1341, 
      "1341 SPRINGWELLS                                      ", 
      "{\"type\":\"Polygon\",\"coordinates\":[[[-83.123052821403263,42.304900313000182],[-83.122725222586453,42.305026934270813],[-83.122725222586453,42.305026934270813],[-83.122445829147622,42.304642333451326],[-83.122445829147622,42.304642333451326],[-83.122458184154638,42.304637916057722],[-83.122458184154638,42.304637916057722],[-83.122811735941411,42.304501563758265],[-83.122811735941411,42.304501563758265],[-83.122824090894738,42.304497146324799],[-83.122824090894738,42.304497146324799],[-83.122893321603414,42.304593517233322],[-83.122893321603414,42.304593517233322],[-83.122843883602954,42.304612097377699],[-83.122843883602954,42.304612097377699],[-83.123052821403263,42.304900313000182]]]}", 
      "{\"type\":\"Point\",\"coordinates\":[-83.122752588021712,42.3047635478422]}"
    ];
    var expected_results = {
      parcel_id: "20005579-83", 
      address: "1341 SPRINGWELLS",
      polygon: {"type":"Polygon","coordinates":[[[-83.123052821403263,42.304900313000182],[-83.122725222586453,42.305026934270813],[-83.122725222586453,42.305026934270813],[-83.122445829147622,42.304642333451326],[-83.122445829147622,42.304642333451326],[-83.122458184154638,42.304637916057722],[-83.122458184154638,42.304637916057722],[-83.122811735941411,42.304501563758265],[-83.122811735941411,42.304501563758265],[-83.122824090894738,42.304497146324799],[-83.122824090894738,42.304497146324799],[-83.122893321603414,42.304593517233322],[-83.122893321603414,42.304593517233322],[-83.122843883602954,42.304612097377699],[-83.122843883602954,42.304612097377699],[-83.123052821403263,42.304900313000182]]]}, 
      centroid: {"type":"Point","coordinates":[-83.122752588021712,42.3047635478422]}
    };
    
    console.log(NSB.API);
    
    parsed_results = NSB.API.parseObjectData(fake_data);
    expect(parsed_results).toEqual(expected_results);
  });
  
});