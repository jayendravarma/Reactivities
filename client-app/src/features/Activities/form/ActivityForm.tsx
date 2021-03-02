import React, {FormEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

import {v4 as uuid} from 'uuid';

interface IProps{
    setEditmode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submiting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({setEditmode, activity: initialFormState,
    createActivity, editActivity, submiting}) => {


    const initilizeForm = () => {
        if(initialFormState){
            return initialFormState;
        }else{
            return{
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initilizeForm);

    const handleSubmit = () => {
        console.log(activity);
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }else{
            editActivity(activity);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title}></Form.Input>
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity.description}></Form.TextArea>
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category}></Form.Input>
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity.date}></Form.Input>
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city}></Form.Input>
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue}></Form.Input>
                <Button loading={submiting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditmode(false)} floated='right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}


export default ActivityForm;