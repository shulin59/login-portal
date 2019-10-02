// Initial Declaration for all variables
var width, height,size,projection,geoGenerator,geojson;
//Get Context
var context = document.getElementById('content').getContext('2d');
initialize();
function initialize() {
    // Register an event listener to call the resizeCanvas() function each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
    // Keep drawing the lines on the ball
    geojson = {type: 'Feature', geometry: {type: 'LineString', coordinates: []}};
    function rndLon() {return -180 + Math.random() * 360;}
    function rndLat() {return -90 + Math.random() * 180;}
    function addPoint() {geojson.geometry.coordinates.push([rndLon(), rndLat()])}

    function update(t)
    {
        if(geojson.geometry.coordinates.length < 500)
            {
                addPoint();
            }

        projection.rotate([t / 300]); //Speed of rotation

        context.clearRect(0, 0, width, height);
        context.beginPath();
        geoGenerator(geojson);
        context.stroke();

        window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);
}	

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window.
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    redraw(); //Determines the position of the ball
}

function redraw()
{
    size = d3.min([width/2, height/2]);
    console.log("redrawheight",height);
    d3.select('#content')
        .attr('width', width + 'px')
        .attr('height', height + 'px');

    context.lineWidth = 0.2; //Stroke width
    context.strokeStyle = 'rgba(250, 250, 250, 0.6)'; //Color of the stroke

    projection = d3.geoOrthographic()
        .scale(1.45 * size)  //TO increase the size
        .translate([0.9 * width, 0.9 * height]); //Determines the position
    
    geoGenerator = d3.geoPath()
    .projection(projection)
    .context(context);
}



    