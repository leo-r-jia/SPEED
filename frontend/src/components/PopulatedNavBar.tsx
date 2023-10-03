import NavBar from "./nav/NavBar";
import NavItem from "./nav/NavItem";
import styles from "./PopulatedNavBar.module.scss";

const PopulatedNavBar = () => {

    return (
        <NavBar>
            <div className={styles.heading}>
                <NavItem route="/">SPEED</NavItem>
            </div>
            <NavItem route="/">
                Home
            </NavItem>
            <NavItem route="/articles/new">
                Submit New Article
            </NavItem>
            <NavItem route="/articles/moderator">
                Moderator View
            </NavItem>
            <NavItem route="/articles">
                User View
            </NavItem>
        </NavBar>
    );

};



export default PopulatedNavBar; 