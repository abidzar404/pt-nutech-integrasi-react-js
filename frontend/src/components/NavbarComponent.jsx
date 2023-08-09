import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Container } from "reactstrap";

function NavbarComponent() {
   return (
      <div>
         <Container>
            <Navbar
               color="black"
               expand="md">
               <NavbarBrand
                  href="/"
                  style={{ color: "white" }}>
                  Abi Wibisono
               </NavbarBrand>
               <Nav
                  className="me-auto"
                  navbar>
                  <NavItem>
                     <NavLink
                        href="https://github.com/reactstrap/reactstrap"
                        style={{ color: "white" }}>
                        About
                     </NavLink>
                  </NavItem>
               </Nav>
               <NavbarText style={{ color: "white" }}>Hi, Admin!</NavbarText>
            </Navbar>
         </Container>
      </div>
   );
}

export default NavbarComponent;
