import React from "react";
import Params from "../Params";
import {Typography} from "antd";
import {getComponentId, scrollToAnchor} from "../../utils";
const Component = props => {
    const { docs } = props;
    return (
        <div>
            {docs.map((doc, index) => (
                <div id={getComponentId(doc)} key={index}>
                    <Typography.Title level={2}>
                        <a onClick={e => {
                           e.preventDefault();
                           scrollToAnchor(getComponentId(doc))
                        }} href={`#${getComponentId(doc)}`}>{doc.name}</a>
                    </Typography.Title>
                    <Typography.Text>{doc.comment}</Typography.Text>
                    <Typography.Title level={3}>API</Typography.Title>
                    <Params params={doc.params}/>
                </div>
            ))}
        </div>
    )
};

export default Component;
