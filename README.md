3-D engine that I made using Javascript, and HTML canvas. Make custom cuboids (a cuboid is a three dimensional rectangle), and make a combination of translational movements and rotational movements.

DOCUMENTATION: 

The heart of the application is the transform function. 

The transform function takes in 13 arguments.

The first three arguments are the initial position of the physical object (object here is not reffering to the datatype. Think of a physical object like a cube or chair) as x,y,z coordinates in three dimensional space. They're role is more important than that though as they will affect the length of the oribit if a rotational velocity is present.

The fourth arument is the physical object that is about to be displayed. Cuboids can be easily used here as this engine has a cuboid maker function already made. You can make your own custom objects by combining different cuboids in to the desired shape, or you can make your own shape. This argument needs to be an array of arrays of objects whose values are numbers. These numbers are the x,y,z coordinate of the point. The object that as these coordinates is the point.  The array that holds these objects is a face. The face here is a two dimensional area. Finally, an array holds these arrays.

The next three arguments are x,y,z rotational velocites. These will be determine the plane that the physical object will travel through. A physical object with an x rotational velocity with no y or z rotational velocities will travel in the y-z plane. A physical object with a y rotational velocity will travel in the x-z plane etc. The higher this number, the faster it will rotate in that direction. A combination of more than one rotational velocity is acceptable.

The next three arguments are the x,y,z coordinates of the point the physical object is rotating about. This in combination with the initial position of the physical object(first three arguments) will determine the length of the orbit.

The next and final three arguments are the x,y,z translational velocities of the physical object. A physical object with an x translational velocity will travel straight in the x-direction, a physical object with a y translational velocity will travel straight in the y direction, etc. The higher this number the faster it will go. A combination of all three is valid.

