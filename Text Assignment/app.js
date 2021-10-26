
let articleData = [ { "title": "A Ranking Problem", "upvotes": 1, "views": 76, "reads": 31, "firstPublishedAt": 1630705429358, "readingTime": 5, "claps": 1, "internalReferrerViews": 20, "friendsLinkViews": 7, "publication": "Cantor’s Paradise", "readRatio": 40.79, "toolTipVisible": false }, { "title": "#1 Top Writers", "upvotes": 4, "views": 25, "reads": 7, "firstPublishedAt": 1630514719840, "readingTime": 7, "claps": 35, "internalReferrerViews": 22, "friendsLinkViews": 0, "publication": "Writers’ Blokke", "readRatio": 28 , "toolTipVisible": false}, { "title": "Analysing Medium Topics", "upvotes": 7, "views": 36, "reads": 12, "firstPublishedAt": 1630346587871, "readingTime": 4, "claps": 159, "internalReferrerViews": 34, "friendsLinkViews": 0, "publication": "Geek Culture", "readRatio": 33.33 , "toolTipVisible": false}, { "title": "Trapezoidal Numbers", "upvotes": 19, "views": 447, "reads": 208, "firstPublishedAt": 1629984153986, "readingTime": 4, "claps": 86, "internalReferrerViews": 223, "friendsLinkViews": 0, "publication": "Cantor’s Paradise", "readRatio": 46.53 , "toolTipVisible": false}, { "title": "Where Medium Articles are Published", "upvotes": 15, "views": 76, "reads": 28, "firstPublishedAt": 1629797250703, "readingTime": 13, "claps": 461, "internalReferrerViews": 62, "friendsLinkViews": 1, "publication": "Writers’ Blokke", "readRatio": 36.84 , "toolTipVisible": false}, { "title": "5 things I love about being a teacher", "upvotes": 9, "views": 49, "reads": 17, "firstPublishedAt": 1628738554541, "readingTime": 6, "claps": 72, "internalReferrerViews": 36, "friendsLinkViews": 0, "publication": "ILLUMINATION", "readRatio": 34.69 , "toolTipVisible": false}, { "title": "The Central Limit Theorem — Why Is It So?", "upvotes": 22, "views": 988, "reads": 338, "firstPublishedAt": 1628528248592, "readingTime": 7, "claps": 96, "internalReferrerViews": 644, "friendsLinkViews": 5, "publication": "Cantor’s Paradise", "readRatio": 34.21 ,"toolTipVisible": false }, { "title": "Playing with Geometry — IMO 2021 Problem 4", "upvotes": 24, "views": 2032, "reads": 1055, "firstPublishedAt": 1627387101915, "readingTime": 4, "claps": 231, "internalReferrerViews": 649, "friendsLinkViews": 0, "publication": "Cantor’s Paradise", "readRatio": 51.92 , "toolTipVisible": false }, { "title": "IMO 2021 — Results and Analysis", "upvotes": 5, "views": 247, "reads": 175, "firstPublishedAt": 1627138768198, "readingTime": 2, "claps": 11, "internalReferrerViews": 69, "friendsLinkViews": 0, "publication": "Self-published", "readRatio": 70.85 , "toolTipVisible": false}, { "title": "A Journey through IMO 2021 — Problem 1", "upvotes": 43, "views": 2507, "reads": 992, "firstPublishedAt": 1627027118347, "readingTime": 9, "claps": 149, "internalReferrerViews": 801, "friendsLinkViews": 0, "publication": "Cantor’s Paradise", "readRatio": 39.57 , "toolTipVisible": false} ]

let svg = d3.select("#plotSVG")
  .style("overflow","visible") // some tooltips stray outside the SVG border
  .append("g")
  .attr("transform", "translate(50,50)")

let xScale = d3.scaleLinear()
  .domain([0, 2500])   // my x-variable has a max of 2500
  .range([0, 600]);   // my x-axis is 600px wide

let yScale = d3.scaleLinear()
  .domain([0, 1200])   // my y-variable has a max of 1200
  .range([400, 0]);   // my y-axis is 400px high
                      // (the max and min are reversed because the 
                      // SVG y-value is measured from the top)

let yVar = "reads";

let pubColors = {
    "Self-published": "#7f7f7f",
    "Other publications": "#8c564b",
    "Cantor’s Paradise": "#1f77b4",
    "Writers’ Blokke": "#ff7f0e",
    "ILLUMINATION": "#2ca02c",
    "Geek Culture": "#d62728"
}

svg.append("g")       // the axis will be contained in an SVG group element
  .attr("id","yAxis")
  .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )
  
svg.append("g")       
  .attr("transform", "translate(0,400)")    // translate x-axis to bottom of chart
  .attr("id","xAxis")
  .call(d3.axisBottom(xScale)
          .ticks(5)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )

svg.selectAll(".bubble")
  .data(articleData)    // bind each element of the data array to one SVG circle
  .join("circle")
  .attr("class", "bubble")
  .attr("cx", d => xScale(d.views))   // set the x position based on the number of claps
  .attr("cy", d => yScale(d.reads))   // set the y position based on the number of views
  .attr("r", d => Math.sqrt(d.readingTime)*5)  // set the radius based on the article reading time
  .attr("stroke", d => pubColors[d.publication])
  .attr("fill", d => pubColors[d.publication])
  .attr("fill-opacity", 0.5)
  .on("mouseover",(e,d) => {    // event listener to show tooltip on hover
    d3.select("#bubble-tip-"+d.firstPublishedAt)  // i'm using the publish time as a unique ID
      .style("display","block");
  })
  .on("mouseout", (e,d) => {    // event listener to hide tooltip after hover
    if(!d.toolTipVisible){
      d3.select("#bubble-tip-"+d.firstPublishedAt)
        .style("display","none");
    }
  })
  .on("click", (e,d) => {    // event listener to make tooltip remain visible on click
    if(!d.toolTipVisible){
      d3.select("#bubble-tip-"+d.firstPublishedAt)
        .style("display", "block");
      d.toolTipVisible = true;
    }
    else{
      d3.select("#bubble-tip-"+d.firstPublishedAt)
        .style("display", "none");
      d.toolTipVisible = false;
    }
  });


svg.selectAll(".bubble-tip")
  .data(articleData)
  .join("g")
  .attr("class", "bubble-tip")
  .attr("id", (d)=> "bubble-tip-"+d.firstPublishedAt)
  .attr("transform", d => "translate(" + (xScale( d.views )+20) + ", " + yScale( d.reads) + ")"  )
  .style("display", "none")   
  .append("rect")     // this is the background to the tooltip
  .attr("x",-5)
  .attr("y",-20)
  .attr("rx",5)
  .attr("fill","white")
  .attr("fill-opacity", 0.9)
  .attr("width",180)
  .attr("height",100)

// SVG does not wrap text
// so I add a new text element for each line (4 words)
svg.selectAll(".bubble-tip")
  .append("text")
  .text(d =>d.title.split(" ").slice(0,4).join(" "))
  .style("font-family", "sans-serif")
  .style("font-size", 14)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.publication])

svg.selectAll(".bubble-tip")
  .append("text")
  .text(d =>d.title.split(" ").slice(4,8).join(" "))
  .attr("y", 18)
  .style("font-family", "sans-serif")
  .style("font-size", 14)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.publication])

svg.selectAll(".bubble-tip")
  .append("text")
  .text(d =>d.title.split(" ").slice(8,12).join(" ") + (d.title.split(" ").length > 12 ? "..." : "") )
  .attr("y", 36)
  .style("font-family", "sans-serif")
  .style("font-size", 14)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.publication])

svg.selectAll(".bubble-tip")
  .append("text")
  .text(d => "- " + d.publication)
  .attr("y", d => (d.title.split(" ").length > 8 ? 54 : 36) )
  .style("font-family", "sans-serif")
  .style("font-style", "italic")
  .style("font-size", 14)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.publication])

svg.selectAll(".bubble-tip")
  .append("text")
  .classed("bubble-tip-yText", true)
  .text(d => "(" + d[yVar] + " " + yVar + ")")
  .attr("y", d => (d.title.split(" ").length > 8 ? 72 : 54) )
  .style("font-family", "sans-serif")
  .style("font-size", 14)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.publication])

let xVar = document.getElementById("select-x-var").value;

document.getElementById("select-x-var").addEventListener("change", (e)=>{
  
  // update the x-variable based on the user selection
  xVar = e.target.value   
  
  if(xVar === "firstPublishedAt"){
            
    xScale = d3.scaleTime()
      .domain([d3.min(articleData, d => d[xVar]), d3.max(articleData, d => d[xVar])])
      .range([0, 600]);

    d3.select("#xAxis")
      .call(d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%b %d")) )  
            //see here for time formatting options: 
            // https://github.com/d3/d3-time-format
  }
  else if(xVar === "publication"){
             
    xScale = d3.scaleBand()
      .domain(Object.keys(pubColors))
      .range([0, 600])
      .padding(1) // space them out so the bubble appears in the centre
    
    svg.select("#xAxis")            
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
        // offset the publication names to fit them in horizontally
        .attr("transform", (d,i)=>`translate(0, ${(i%2)*20})`)
        .style("fill", d => pubColors[d])
  }
  else{
    // rescale the x-axis
    xScale = d3.scaleLinear()
      .domain([0, d3.max(articleData, d => d[xVar]) ])    
      .range([0, 600]);

    // redraw the x-axis
    svg.select("#xAxis")            
      .call(d3.axisBottom(xScale)
          .ticks(5)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )
  
  }
  // transition each circle element
    svg.selectAll(".bubble")
      .transition()
      .duration(1000)
      .attr("cx", (d) => xScale(d[xVar]) )
  
  // transition each tooltip
    svg.selectAll(".bubble-tip")
      .transition()
      .duration(1000)
      .attr("transform", d => "translate(" + (xScale(d[xVar])+20) + ", " +  yScale(d[yVar]) + ")" )
})

document.getElementById("select-y-var").addEventListener("change", (e)=>{
  
  // update the x-variable based on the user selection
  yVar = e.target.value   

  // rescale the x-axis
  yScale = d3.scaleLinear()
    .domain([0, d3.max(articleData, d => d[yVar]) ])    
    .range([400, 0]);

  // redraw the x-axis
  svg.select("#yAxis")            
    .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )

  // transition each circle element and tooltip
  svg.selectAll(".bubble")
    .transition()
    .duration(1000)
    .attr("cy", (d) => yScale(d[yVar]) )
    
  svg.selectAll(".bubble-tip-yText")
    .text(d => "(" + d[yVar] + " " + yVar + ")")
  
  svg.selectAll(".bubble-tip")
      .attr("transform", d => "translate(" + (xScale(d[xVar])+20) + ", " +  yScale(d[yVar]) + ")" )
})