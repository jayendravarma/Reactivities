import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
  setEditmode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  
}

export const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditmode,
  setSelectedActivity,
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => setEditmode(true)}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            onClick={() => setSelectedActivity(null)}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;