import React, { Component } from 'react';
import AngleGraph from './AngleGraph';
import FeedbackGraph from './FeedbackGraph';
import ColorsGraph from './ColorsGraph';

class Legend extends Component {

    render() {
        return (
            <div className="legend-container">
                <h2>How to read ?</h2>
                <p className="legend-intro">Each group of circles stands for a running circuit. Each circle represents a run on that circuit. For each circuit a series of colors represents the colors seen in real life on that track. For each run, a series of colors represents the music I was listening to. For each run, a feedback bar gives details about my state of mind.</p>
                <p className="legend-intro">Each music zone links to a youtube extract.</p>
                <div className="angle-graph">
                    <p id="angle-graph-feedback">The feedback bar (see below)</p>
                    <p id="angle-graph-angle">The difficulty angle : horizontal bar = easy run vertical bar = not so easy</p>
                    <AngleGraph id={3} circuit={this.props.circuit} run={this.props.run}></AngleGraph>
                </div>
                <div className="feedback-graph">
                    <p id="environment-feedback">Environmental feedback (3/3)</p>
                    <p id="physical-feedback">Physical fulfillment feedback (1/3)</p>
                    <p id="psychological-feedback">Psychological fulfillment feedback (3/3)</p>
                    <FeedbackGraph id={4} circuit={this.props.circuit} run={this.props.run}></FeedbackGraph>
                </div>
                <div className="colors-graph">
                    <p id="colors-top">One color for each music I have listened to during the run</p>
                    <p id="colors-bottom">One color for the environment at each km of the run</p>
                    <ColorsGraph id={5} circuit={this.props.circuit} run={this.props.run}></ColorsGraph>
                </div>
            </div>
        );
    }
}

export default Legend;