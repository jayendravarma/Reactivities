import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
//import logo from "./logo.svg";
// import './App.css';
//import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivitiesDashboard from "../../features/Activities/dashboard/ActivitiesDashboard";
// import * from '../api/agent.ts';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

interface IState {
  activities: IActivity[];
}

//class App extends Component<{}, IState> {
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditmode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [target, setTarget] = useState('');

  
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditmode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditmode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmiting(true);
    agent.Activities.create(activity).then((response) => {

      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditmode(false);

    }).then(() => setSubmiting(false))
  
  }
  const handleEditActivity = (activity: IActivity) => {
    setSubmiting(true);
    agent.Activities.update(activity).then(response => {

      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditmode(false);

    }).then(() => setSubmiting(false))

    
  }
  const handleDelete = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmiting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(response => {

      setActivities([...activities.filter(a => a.id !== id)]);

    }).then(() => setSubmiting(false))

    
  }


  useEffect(() => {
   agent.Activities.list()
      .then(response => {
        // console.log(response);
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      }).then(() => setLoading(false));
  }, []);
  // state: IState = {
  //   activities: [],
  // };

  // componentDidMount() {
  //   axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
  //     console.log(response);
  //     this.setState({
  //       activities: response.data,
  //     });
  //   });
  // }

  // render() {

  if(loading) return <LoadingComponent content='Loading activities ..' />
  return (
    <Fragment>
      {/* className="App"   */}
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}

      <NavBar openCreateForm={handleOpenCreateForm} />

      <Container style={{marginTop: '7em'}}>
       <ActivitiesDashboard 
       activities={activities} 
       selectActivity={handleSelectActivity}
       selectedActivity={selectedActivity}
       editMode = {editMode}
       setEditmode = {setEditmode}
       setSelectedActivity={setSelectedActivity}
       createActivity = {handleCreateActivity}
       editActivity = { handleEditActivity}
       deleteActivity = {handleDelete}
       submiting = {submiting}
       target = {target}
        />
      </Container>

      {/* </header> */}
    </Fragment>
  );
  // }
};

export default App;
