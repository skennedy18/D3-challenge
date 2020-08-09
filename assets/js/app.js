// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top:20,
    right:40,
    bottom:80,
    left: 50
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

d3.csv("assets/data/data.csv", function(err, censusRecord){
  if(err) throw err;
      censusRecord.forEach(function(record){
          record.smokes = +record.smokes;
          record.poverty = +record.poverty;
      }); 

    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusRecord, d=>d["smokes"]-1),
      d3.max(censusRecord,d=>d["smokes"])])
      .range([0,chartWidth]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(censusRecord, d=>d["poverty"]-1),
      d3.max(censusRecord, d=>d["poverty"])])
      .range([chartHeight,0]);
    
      var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xLinearScale));
    
      chartGroup.append("g")
      .call(d3.axisLeft(yLinearScale));

    var States =  chartGroup.selectAll("g.dot")
      .data(censusRecord)
      .enter()
      .append('g');

      States.append("circle")
      .attr("cx", d => xLinearScale(d["smokes"]))
      .attr("cy", d => yLinearScale(d["poverty"]))
      .attr("r", d=>d.obesity / 2)
      .attr("fill", "lightblue")
      .attr("opacity", ".5");

      States.append("text").text(d=>d.abbr)
      .attr("x", d => xLinearScale(d.smokes)-4)
      .attr("y", d => yLinearScale(d.poverty)+2)
      .style("font-size",".5em")
      .classed("fill-text", true);

    var Chartlabels = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var Data = Chartlabels.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "smokes") 
      .classed("active", true)
      .text("Smoking (%)");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .classed("active", true)
      .text("Poverty");
});