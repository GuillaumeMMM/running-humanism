import React, { Component } from 'react';
import * as d3 from 'd3';

class FeedbackGraph extends Component {
    state = {
        width: 0,
        height: 0
    }

    render() {
        return (
           <div className="graph-container" id={"basic-chart-" + this.props.id} style={{ width: '300px', height: '150px' }}>

           </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('basic-chart-' + this.props.id).clientWidth;
        const height = document.getElementById('basic-chart-' + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, this.initGraph)
    }

    initGraph = () => {
        const { width, height } = this.state;

        const svg = d3.select('#basic-chart-' + this.props.id)
            .append('svg')
            //  The viewbox will try to fill all the space given but preserving the ratio.
            //  h = div height, w = div width
            //  if h > w viewbox = 0 0 100 100*h/w
            //  if w > h viewbox = 0 0 100*w/h 100
            .attr('viewBox', () => {
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(0) + ', ' + this.relativeHeight(0) + ')');

        const feedbackGroup = mainGroup.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(16) + ', ' + this.relativeHeight(20) + ')')
            .attr('class', 'feedback-group');

        feedbackGroup.append('rect').attr('x', -8).attr('y', -5).attr('width', this.relativeWidth(72)).attr('height', 15).attr('fill', '#383838');

        this.props.run.feedback.forEach((feed, index) => {
            const feedbacks = ['E', 'P', 'I'];

            //  feedback letters
            feedbackGroup.append('text')
                    .attr('x', index * this.relativeHeight(45) + 3)
                    .text(feedbacks[index])
                    .attr('y', 3.2)
                    .attr('text-anchor', 'middle')
                    .attr('alignment-baseline', 'middle')
                    .style('font-size', '8px')
                    .attr('fill', 'white');
            
            //  Circle around feedback letters
            feedbackGroup.append('circle')
                    .attr('cx', index * this.relativeHeight(45) + 3)
                    .attr('cy', 2.6)
                    .attr('r', 5)
                    .attr('fill', 'none')
                    .style('stroke', 'white')
                    .style('stroke-width', 0.7);

            //  Feedback circle points
            for (let i = 0; i < feed; i++) {
                feedbackGroup.append('circle')
                    .attr('cx', 10 + index * (this.relativeHeight(45)) + (i + 1) * this.relativeHeight(22) / (this.props.run.feedback.length))
                    .attr('cy', 2.6)
                    .attr('r', 2)
                    .attr('fill', 'white');
            }
        });

        mainGroup.append('path')
        .attr('d', 'M ' + this.relativeWidth(17.5) + ' ' + this.relativeWidth(15) + ' L ' + this.relativeWidth(17.5) + ' ' + this.relativeWidth(20))
        .attr('stroke', '#383838').attr('stroke-width', 0.5);

        mainGroup.append('path')
        .attr('d', 'M ' + this.relativeWidth(40) + ' ' + this.relativeWidth(15) + ' L ' + this.relativeWidth(40) + ' ' + this.relativeWidth(30))
        .attr('stroke', '#383838').attr('stroke-width', 0.5);

        mainGroup.append('path')
        .attr('d', 'M ' + this.relativeWidth(62.5) + ' ' + this.relativeWidth(15) + ' L ' + this.relativeWidth(62.5) + ' ' + this.relativeWidth(20))
        .attr('stroke', '#383838').attr('stroke-width', 0.5);


        this.setState({ mainGroup: mainGroup });
    }

    //  Takes a % ang returns the right height
    relativeHeight = (height) => {
        return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
    }

    //  Takes a % ang returns the right width
    relativeWidth = (width) => {
        return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
    }
}

export default FeedbackGraph;