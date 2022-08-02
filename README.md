# Module Federation with webpack 5 and React

This demo leverages webpack 5 and module federation to deliver code sharing at run time. </br>
The remote project makes a library of components available at run time ready for the host project to consume.
</br>
</br>
This simple example shows how a form component can be consumed at run time.

### Host

This is the project that consumes the components from the remote application.
The remote application must be running in order for this to work.

### Remote

This project is the origin of the components. Host application can then consume the components at run time.
