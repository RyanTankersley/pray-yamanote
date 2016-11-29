'use strict';

import PageHeader from './components/shared/PageHeader.jsx';
import StationList from './components/shared/StationList.jsx';

const React = require('react');
class App extends React.Component{
    render() {
        return (
            <div>
                <PageHeader />
                {this.props.children}
            </div>
        );
    }
};

module.exports = App;