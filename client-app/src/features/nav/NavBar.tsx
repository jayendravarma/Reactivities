import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";

interface Iprops {
  openCreateForm: () => void;
}

export const NavBar: React.FC<Iprops> = ({openCreateForm}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}} />
            Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item >
            <Button onClick={openCreateForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
