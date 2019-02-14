import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardImg } from 'reactstrap';

export const Header = () => {
    return (
        <div className="card">
            <Card> 
                <CardBody>
                <CardHeader 
                style={{ margin: 0, backgroundColor: '#37474F', WebkitTextFillColor: '#ffffff'}}
                tag="h1">
                RoadRate
                </CardHeader>
                <CardTitle 
                style={{ backgroundColor: '#263238', WebkitTextFillColor: '#ffffff'}}
                >Responsibly rate drivers. 100% anonymous.</CardTitle>
                </CardBody>
                <CardImg
                style={{ opacity: 0.8, }}
                className="card-img" 
                top width="100%"
                src="https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" /> 
            </Card>
        </div>
    )
}

export default Header;