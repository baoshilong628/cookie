import React from "react";
import Params from "../Params";
import {Typography} from "antd";
const Component = props => {
    const { docs } = props;
    return (
        <div>
            {docs.map((doc, index) => (
                <div key={index}>
                    <Typography.Title level={2}>{doc.name}</Typography.Title>
                    <Typography.Text>{doc.comment}</Typography.Text>
                    <Typography.Title level={3}>API</Typography.Title>
                    <Params params={doc.params}/>
                </div>
            ))}
        </div>
    )
};

export default Component;
