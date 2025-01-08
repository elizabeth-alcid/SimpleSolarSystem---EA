This simple solar system 3D animation was created using Three.js. 
It displays Venus, Earth, and Jupiter as they orbit the Sun. 
Texture mapping for the sun and planets was pulled from: https://planetpixelemporium.com/planets.html
The animation also includes a starfield with randomly generated stars. 
The code implementation to generate the stars was pulled from: https://github.com/bobbyroe/threejs-earth/blob/main/src/getStarfield.js

Step-by-step Implementation Guide (follows step-numbering in comments of index.js):
1. Initial Scene Setup:
   First, setup the renderer with the dimensions of the standard browser window. Set "antialias" in renderer initialization
   to true to give smoother edges to the animation. Append the renderer's canvas to the body of the HTML doc which will display
   the animation content in the browser. Next, set up the camera (field of view, aspect, near, far) and set the camera position (z-axis)
   to 50 so that the entire solar system can be viewed. Initialize the scene, and set up the mouse controls using the imported OrbitControls module.
   The OrbitControls module enables the user to move around the scene using their mouse. The user
   can rotate, zoom, and pan.
   
2. Stars/Planets Setup:
   Each planetary body follows the same setup. First, initialize the loader which will hold the texture
   loader. Initialize the geometry (sphere shape) and initialize the material (texture map) using the loader. Mesh the geometric object and the texture to
   get the complete planetary body. Add that body to the scene. Repeat this for each planetary body - Sun, Venus, Earth, Jupiter. Next, create a starfield by
   initializing an object of the getStarfield() function and add that object to the scene. I've also added hemisphere lighting by
   initializing an object of HemisphereLight and adding it to the scene. *Note that in the context of the solar
   system, the hemisphere lighting doesn't really make sense but I thought it helped the user see the sun and planets better :)

3. Planet Orbits Setup:
   Create variables to hold the planets angles (which will initially start at 0), orbital speeds (speed at which the planet
   orbits the sun), and orbital radii (distance of planet from Sun). *Note the inputted measurements are not to scale

4. Animation Loop:
   Call requestAnimationFrame() to ensure continuous update of the animation. Set the y-axis rotation of the sun and planets
   to simulate the rotation of the sun and planets on their axes. *Note the rotation speed is the elapsed time multiplied by 0.0001. This scaling
   ensures the planets won't spin too fast after each loop iteration. Next, update the planet angles by adding the planets'
   orbital speeds to the angle. This increases the angle with every loop iteration and simulates the planet moving around the Sun. Now, calculate
   the new positions of each planet by setting the x and z positions of each planet to be its orbital radius multiplied by the cosine or sine of the angle. What
   we're doing is converting the polar coordinates (calculated using the orbital radius and planet angles) to Cartesian coordinates so that the animation can be
   rendered.

   Finally, render the final scene and update the controls (OrbitControls object) to ensure user mouse movements are updated throughout the animation.
   Call the animate() loop.

Possible Improvements:
1. To make the solar system more accurate, I could factor in the axis tilt of each planet and have them rotate around
   that axis rather than the standard y-axis.
2. To make the orbits of each planet more accurate, I would have to alter the orbits to represent ellipses rather than perfectly circular orbits.
   Addditionally, I shouldn't have the planets orbit along the same horizontal plane. This is not an accurate representation of the solar system but moreso
   reflects images you'd see online.
3. I could also add better lighting fixtures to each planet that change based on the planets' position relative to the Sun.
   
