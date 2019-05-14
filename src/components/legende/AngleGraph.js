import React, { Component } from 'react';
import * as d3 from 'd3';

class AngleGraph extends Component {
    state = {
        width: 0,
        height: 0
    }

    render() {
        return (
           <div className="graph-container" id={"basic-chart-" + this.props.id} style={{ width: '150px', height: '150px' }}>

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


        // define the clippath
        mainGroup.append('clipPath')
            .attr("id", "ellipse-clip")
            .append('circle')
            .attr("cx", this.relativeHeight(50))
            .attr("cy", this.relativeHeight(50))
            .attr("r", this.relativeHeight(38));

        //  Circle black outline
        mainGroup.append('circle')
            .attr("cx", this.relativeHeight(50))
            .attr("cy", this.relativeHeight(50))
            .attr("r", this.relativeHeight(38))
            .attr('fill', 'none')
            .style('stroke', '#383838')
            .style('stroke-width', 0.4);

        //  Limit black outline
        mainGroup.append('path')
            .attr("d", 'M 0 ' + this.relativeHeight(70) + ' L 100 ' + this.relativeHeight(70))
            .attr("clip-path","url(#ellipse-clip)")
            .style('stroke', '#383838')
            .style('stroke-width', 0.4);

        //  legend path
        mainGroup.append('path')
            .attr("d", 'M ' +  this.relativeHeight(50) + ' ' + this.relativeHeight(70) + ' L ' + this.relativeHeight(70) + ' ' + this.relativeHeight(100))
            .style('stroke', '#383838')
            .style('stroke-width', 0.4);

        //  legend path
        mainGroup.append('path')
            .attr("d", 'M ' +  this.relativeHeight(50) + ' ' + this.relativeHeight(40) + ' L ' + this.relativeHeight(100) + ' ' + this.relativeHeight(110))
            .style('stroke', '#383838')
            .style('stroke-width', 0.4);

        //  Init the circuit
        mainGroup.selectAll('.circuit-rect')
            .data(this.props.circuit.kmColors).enter()
            .append('rect')
            .attr('class', 'circuit-rect')
            .attr('y', this.relativeHeight(70))
            .attr('x', (d, i) => this.relativeWidth(10) + i * this.relativeWidth(80) / this.props.circuit.kmColors.length)
            .attr('height', this.relativeHeight(30))
            .attr('width', this.relativeWidth(80) / this.props.circuit.kmColors.length)
            .attr("clip-path","url(#ellipse-clip)")
            .attr('fill', 'none')
            .style('stroke', 'rgba(0,0,0,0.2)')
            .style('stroke-width', 0.2);

        //  Init the runs
        mainGroup.selectAll('.run-rect')
            .data(this.props.run.music).enter()
            .append('rect')
            .attr('class', 'run-rect')
            .attr('y', this.relativeHeight(0))
            .attr('x', (d, i) => this.relativeWidth(10) + d.km * this.relativeWidth(80) / this.props.circuit.kmColors.length)
            .attr('height', this.relativeHeight(70))
            .attr('width', (d, i) => (d.longueur + 1) * this.relativeWidth(80) / (this.props.circuit.kmColors.length))
            .attr("clip-path","url(#ellipse-clip)")
            .attr('fill', 'none')
            .style('stroke', 'rgba(0,0,0,0.4)')
            .style('stroke-width', 0.2);

        const feedbackGroup = mainGroup.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(20) + ')')
            .attr('class', 'feedback-group');

        feedbackGroup.append('rect').attr('x', -2).attr('y', -2).attr('width', 4).attr('height', this.relativeHeight(35.5)).attr('fill', '#383838');

        this.props.run.feedback.forEach((feed, index) => {
            const feedbacks = ['E', 'P', 'I'];

            //  feedback letters
            feedbackGroup.append('text')
                    .attr('x', 0)
                    .attr('y', index * this.relativeHeight(12))
                    .text(feedbacks[index])
                    .attr('text-anchor', 'middle')
                    .attr('alignment-baseline', 'middle')
                    .style('font-size', '1.5px')
                    .attr('fill', 'white');
            
            //  Circle around feedback letters
            feedbackGroup.append('circle')
                    .attr('cx', 0)
                    .attr('cy', index * this.relativeHeight(12) - 0.1)
                    .attr('r', 1)
                    .attr('fill', 'none')
                    .style('stroke', 'white')
                    .style('stroke-width', 0.1);

            //  Feedback circle points
            for (let i = 0; i < feed; i++) {
                feedbackGroup.append('circle')
                    .attr('cx', 0)
                    .attr('cy', index * this.relativeHeight(12) + (i + 1) * this.relativeHeight(8) / (this.props.run.feedback.length))
                    .attr('r', 0.5)
                    .attr('fill', 'white');
            }
        });

        //  Rotate the circle
        mainGroup.attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ') rotate(-' + (90 * this.props.circuit.difficulty / 100) + ') translate(' + (- this.relativeWidth(50)) + ', ' +  (- this.relativeHeight(50)) + ')');
        // mainGroup.attr('transform', 'rotate(45)');


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

export default AngleGraph;