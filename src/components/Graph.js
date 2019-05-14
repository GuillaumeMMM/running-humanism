import React, { Component } from 'react';
import * as d3 from 'd3';

class Graph extends Component {
    state = {
        width: 0,
        height: 0
    }

    render() {
        return (
           <div className="graph-container" id="basic-chart" style={{ width: '80vmin', height: '80vmin' }}>

           </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('basic-chart').clientWidth;
        const height = document.getElementById('basic-chart').clientHeight;
        this.setState({width: width, height: height}, this.initGraph)
    }

    componentWillReceiveProps(nextProps){

        // //  Delete exceding elemnts
        // this.state.mainGroup.selectAll('.mycircle').data(nextProps.data).exit().remove();

        // //  Add new elements
        // this.state.mainGroup.selectAll('.mycircle').data(nextProps.data).enter()
        // .append('circle')
        //     .attr('class', 'mycircle')
        //     .attr('cx', (d, i) => (i + 1) * this.relativeWidth(100) / (nextProps.data.length + 1))
        //     .attr('cy', 0)
        //     .attr('r', d => 3 + d / 20)
        //     .attr('fill', 'white');

        // //  Move elements to their new position
        // this.state.mainGroup.selectAll('.mycircle').transition().duration(200)
        //     .attr('cx', (d, i) => (i + 1) * this.relativeWidth(100) / (nextProps.data.length + 1))
        //     .attr('r', d => 3 + d / 20);

    }

    initGraph = () => {
        const { width, height } = this.state;

        const svg = d3.select('#basic-chart')
            .append('svg')
            //  The viewbox will try to fill all the space given but preserving the ratio.
            //  h = div height, w = div width
            //  if h > w viewbox = 0 0 100 100*h/w
            //  if w > h viewbox = 0 0 100*w/h 100
            .attr('viewBox', () =>{
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ')');

        //  Init the circuit
        mainGroup.selectAll('.mycircle')
        .data(this.props.circuit.kmColors).enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(this.relativeWidth(20))
            .startAngle((d, i) => i * 2 * Math.PI / this.props.circuit.kmColors.length)
            .endAngle((d, i) => (i + 1) * 2 * Math.PI / this.props.circuit.kmColors.length)
        )
        .attr('fill', (d, i) => d);

        //  Init the circuit
        mainGroup.selectAll('.circuit')
        .data(this.props.circuit.kmColors).enter()
        .append('path')
        .attr('class', 'circuit')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(this.relativeWidth(20))
            .startAngle((d, i) => i * 2 * Math.PI / this.props.circuit.kmColors.length)
            .endAngle((d, i) => (i + 1) * 2 * Math.PI / this.props.circuit.kmColors.length)
        )
        .attr('fill', (d, i) => d);

        // Init the runs
        this.props.runs.filter(run => run.circuit === this.props.circuit.id).forEach((run, index) =>{
            mainGroup.selectAll('.run-' + index)
            .data(run.music).enter()
            .append('path')
            .attr('class', 'run-' + index)
            .attr('d', d3.arc()
                .innerRadius(this.relativeWidth(20 + index * 5))
                .outerRadius(this.relativeWidth(25 + index * 5))
                .startAngle((d, i) => {
                    return run.music[i].km * 2 * Math.PI / this.props.circuit.kmColors.length;
                })
                .endAngle((d, i) => {
                    let kmTemp = run.music[i + 1] ? run.music[i + 1].km : this.props.circuit.kmColors.length;
                    console.log(this.props.circuit.kmColors.length - run.music[i].km)
                    return kmTemp * 2 * Math.PI / this.props.circuit.kmColors.length;
                })
            )
            .attr('fill', (d, i) => d.color);

        //  Init the feedbacks
        mainGroup.append('group').attr('class', 'feedback-group')

        });

        
        this.setState({mainGroup: mainGroup})
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

export default Graph;