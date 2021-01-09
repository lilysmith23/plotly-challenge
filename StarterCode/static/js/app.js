function metadata(sample) {
// Use d3 fetch to read the JSON file
// The data from the Json file is named data
    d3.json("../data/samples.json").then((data) => {
        // define variable metadata
        console.log(data);

        var metadata = data.metadata;
        console.log(metadata);

        // 
        var metadataarray = metadata.filter(sampleobject => sampleobject.id == sample);
        // metadataarray[0] refers to the id of each sample.
        console.log(metadataarray); 

        var id = metadataarray[0]
        console.log(id);

        // DONT UNDERSTAND WHATS HAPPENING HERE
        var INFO = d3.select("#sample-metadata");
        INFO.html("");
        Object.entries(id).forEach(([key, value]) => {
            INFO.append("h6").text(`${key}: ${value}`);
        });
    }); 
}

// Setup for graphs and plots.
function graphs(sample) {
    d3.json("../data/samples.json").then((data) => {
        var samples = data.samples;
        console.log(samples);

        var resultsarray = samples.filter(sampleobject => sampleobject.id == sample);
        console.log(resultsarray);

        var result = resultsarray[0]
        console.log(result);

        var ids = result.otu_ids;
        console.log(ids);

        var labels = result.otu_labels;
        console.log(labels);

        var values = result.sample_values;
        console.log(values);

        // Bar graph
        // Is it the first 10 listed, or the 10 with the highest values?
        var bar_data = [
            {
                x: values.slice(0, 10).reverse(),
                y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }

        ];

        var layout = {
            title: "Top 10 Bacteria Cultures Found"
        };

        Plotly.newPlot("bar", bar_data, layout);

        // Bubble graph
        var bubble = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids,
                    size: values,
                }
            }
        ];

        var layout = {
            margin: {t: 20},
            xaxis: {title: "Id's" },
            hovermode: "closest",
            showlegend: true,
        };

        Plotly.plot("bubble", bubble, layout);


    });
}
// DONT UNDERSTAND THIS PART
function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("../data/samples.json").then((data) => {
        var sampleNames = data.names;
        console.log(sampleNames);

        sampleNames.forEach((sample) => {
            dropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        const firstSample = sampleNames[0];
        metadata(firstSample);
        graphs(firstSample);

    });
}

function optionChanged(newSample) {
    metadata(newSample);
    graphs(newSample);
}

init();

// Do we need to specify one particular name for each bacteria?