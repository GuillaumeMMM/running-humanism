import React, { Component } from 'react';
import * as d3 from 'd3';

class ColorsGraph extends Component {
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

        //  Init the circuit
        mainGroup.selectAll('.circuit-rect')
            .data(this.props.circuit.kmColors).enter()
            .append('rect')
            .attr('class', 'circuit-rect')
            .attr('y', this.relativeHeight(70))
            .attr('x', (d, i) => this.relativeWidth(10) + i * this.relativeWidth(80) / this.props.circuit.kmColors.length)
            .attr('height', this.relativeHeight(30))
            .attr('width', this.relativeWidth(80) / this.props.circuit.kmColors.length)
            .attr("clip-path", "url(#ellipse-clip)")
            .attr('fill', (d, i) => d);

        //  Init the runs
        mainGroup.selectAll('.run-rect')
            .data(this.props.run.music).enter()
            .append('rect')
            .attr('class', 'run-rect')
            .attr('y', this.relativeHeight(0))
            .attr('x', (d, i) => this.relativeWidth(10) + d.km * this.relativeWidth(80) / this.props.circuit.kmColors.length)
            .attr('height', this.relativeHeight(70))
            .attr('width', (d, i) => (d.longueur + 1) * this.relativeWidth(80) / (this.props.circuit.kmColors.length))
            .attr("clip-path", "url(#ellipse-clip)")
            .attr('fill', (d, i) => d.color)
            .style('stroke', (d, i) => d.color)
            .style('stroke-width', 0.1);

        //  Rotate the circle
        mainGroup.attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ') rotate(-' + (90 * this.props.circuit.difficulty / 100) + ') translate(' + (- this.relativeWidth(50)) + ', ' + (- this.relativeHeight(50)) + ')');
        // mainGroup.attr('transform', 'rotate(45)');

        //  legend path
        mainGroup.append('path')
            .attr("d", 'M ' + this.relativeHeight(40) + ' ' + this.relativeHeight(80) + ' L ' + this.relativeHeight(69) + ' ' + this.relativeHeight(120))
            .style('stroke', '#383838')
            .style('stroke-width', 0.4);

        //  legend path
        mainGroup.append('path')
            .attr("d", 'M ' + this.relativeHeight(70) + ' ' + this.relativeHeight(40) + ' L ' + this.relativeHeight(120) + ' ' + this.relativeHeight(110))
            .style('stroke', '#383838')
            .style('stroke-width', 0.4);


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

export default ColorsGraph;