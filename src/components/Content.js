import React, { Component } from 'react';
import GraphTilted from './GraphTilted';
import Legend from './legende/Legend';

class Content extends Component {

    state = {
        data: [50],
        circuits: [
            {
                name: 'Paris, Seine',
                id: 1,
                location: 'Paris',
                longueur: 11,
                kmColors: ['#e4cfb6', '#e4cfb6', '#adc1d1', '#7494c5', '#739244', '#d0cac3', '#c3bbb4', '#9ea394', '#a89e90', '#758295', '#758295'],
                difficulty: 60
            },
            {
                name: 'Paris, Tuilleries',
                id: 2,
                location: 'Paris',
                longueur: 6,
                kmColors: ['#e4cfb6', '#bec7d5', '#6b87b4', '#94aed6', '#bec7d5', '#e4cfb6'],
                difficulty: 30
            },
            {
                name: 'Séné, Moustérian',
                id: 3,
                location: 'Séné',
                longueur: 5,
                kmColors: ['#686e4a', '#b8a88f', '#4b4d3a', '#a3a7ab', '#decfb1'],
                difficulty: 20
            },
            {
                name: 'Legend circuit',
                id: 100,
                location: '',
                longueur: 10,
                kmColors: ['#FFCDB2', '#FFB4A2', '#E5989B', '#B5838D', '#6D6875', '#B5838D', '#E5989B', '#FFB4A2', '#FFCDB2', '#FFCDB2'],
                difficulty: 60
            },
            {
                name: 'New Taipei City',
                id: 33,
                location: 'Taiwan',
                longueur: 8,
                kmColors: ['#868176', '#6b8052', '#adb4c2', '#a3b2d1', '#8290b8', '#ec5854', '#f0f4f1', '#e7daa5'],
                difficulty: 50
            },
        ],
        runs: [
            {
                circuit: 2, 
                music: [
                    {km: 0, album: 'Burial - Untrue', color: 'grey', longueur: 2.5, link: 'https://www.youtube.com/watch?v=LHtNPzaHO7k'},
                    {km: 2.5, album: 'Julius Steinhoff', color: 'yellow', longueur: 3.5, link: 'https://www.youtube.com/watch?v=BCHw-VW7V1U'},
                ],
                feedback: [1, 2, 3]
            },
            {
                circuit: 1, 
                music: [
                    {km: 0, album: 'Shay - Jolie Garce', color: '#eec8d9', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=phh1aZvUyN8'},
                    {km: 3, album: 'Bella Boo - Fire', color: '#dbab88', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=cxImv7zi4Zk'},
                    {km: 6, album: 'Julius Steinhoff', color: '#e8eab2', type: 'music', longueur: 5, link: 'https://www.youtube.com/watch?v=BCHw-VW7V1U'},
                ],
                feedback: [3, 2, 3]
            },
            {
                circuit: 100, 
                music: [
                    {km: 0, album: 'Shay - Antidote', color: '#9C89B8', type: 'music', longueur: 3},
                    {km: 3, album: 'Shay - Jolie Garce', color: '#F0A6CA', type: 'music', longueur: 2},
                    {km: 5, album: 'M.I.L.S', color: '#EFC3E6', type: 'music', longueur: 1},
                    {km: 6, album: 'M.I.L.S', color: '#B8BEDD', type: 'podcast', longueur: 4},
                ],
                feedback: [3, 1, 3]
            },
            {
                circuit: 1, 
                music: [
                    {km: 0, album: 'Burial - Street Halo', color: '#e4cfb6', type: 'music', longueur: 4, link: 'https://www.youtube.com/watch?v=RZSIYhvKlTY'},
                    {km: 4, album: 'Burial - Untrue', color: '#babbbb', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=LHtNPzaHO7k'},
                    {km: 7, album: '', color: '#fff36b', type: 'podcast', longueur: 4, link: 'https://www.youtube.com/watch?v=SFcFz8iBh2A'},
                ],
                feedback: [3, 3, 3]
            },
            {
                circuit: 1, 
                music: [
                    {km: 0, album: 'Sopico - YE', color: '#dc6d85', type: 'music', longueur: 4, link: 'https://www.youtube.com/watch?v=mrwUtwA1Vc4'},
                    {km: 4, album: 'Alpha Wann - UMLA', color: '#5da2ba', type: 'music', longueur: 7, link: 'https://www.youtube.com/watch?v=SBnwrr7IiYE'},
                ],
                feedback: [2, 2, 2]
            },
            {
                circuit: 1, 
                music: [
                    {km: 0, album: 'Dinos - Imany', color: '#6c6c6c', type: 'music', longueur: 2, link: 'https://www.youtube.com/watch?v=KgN-VqgJVSw'},
                    {km: 2, album: 'Recondita - Baro', color: '#84368d', type: 'music', longueur: 2, link:'https://www.youtube.com/watch?v=Faz5zU1q-88'},
                    {km: 4, album: 'HNNY - Good', color: '#cba1d7', type: 'music', longueur: 4, link: 'https://www.youtube.com/watch?v=8nkJJ1HSFNc'},
                    {km: 8, album: 'Veence Hanao - Bodie', color: '#bfbfbf', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=hsEvm4BykGo'},
                ],
                feedback: [2, 2, 3]
            },
            {
                circuit: 2, 
                music: [
                    {km: 0, album: 'Burial - Untrue', color: '#cccccc', type: 'music', longueur: 5, link: 'https://www.youtube.com/watch?v=eHjxJItKbLQ'},
                ],
                feedback: [3, 3, 3]
            },
            {
                circuit: 4, 
                music: [
                    {km: 0, album: 'Colombine - Adieu Bientot', color: '#ffa423', type: 'music', longueur: 2, link: 'https://www.youtube.com/watch?v=hNK5izw6jUs'},
                    {km: 2, album: 'Jacques Greene', color: '#8dd430', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=koBnBenTvgY'},
                    {km: 5, album: 'Burial - Untrue', color: '#fff95e', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=aAbni8pbneM'},
                ],
                feedback: [2, 1, 1]
            },
            {
                circuit: 4, 
                music: [
                    {km: 0, album: 'Burial - Untrue', color: '#cccccc', type: 'music', longueur: 5, link: 'https://www.youtube.com/watch?v=eHjxJItKbLQ'},
                    {km: 5, album: 'Veence Hanao - Leslie', color: 'rgb(56, 56, 250)', type: 'music', longueur: 3, link: 'https://www.youtube.com/watch?v=zcGDdie59NI'},
                ],
                feedback: [2, 1, 2]
            },
        ]
    }

    render() {
        return (
            <div className="content-container">
                <Legend circuit={this.state.circuits[3]} run={this.state.runs[2]}></Legend>
                <div className="paris-seine">
                    <GraphTilted id={113} data={this.state.data} circuit={this.state.circuits[0]} run={this.state.runs[3]} dim={70}></GraphTilted>

                    <GraphTilted id={2} data={this.state.data} circuit={this.state.circuits[0]} run={this.state.runs[1]} dim={30}></GraphTilted>

                    <GraphTilted id={114} data={this.state.data} circuit={this.state.circuits[0]} run={this.state.runs[4]} dim={30}></GraphTilted>

                    <GraphTilted id={115} data={this.state.data} circuit={this.state.circuits[0]} run={this.state.runs[5]} dim={30}></GraphTilted>

                    <p className="title">Paris, Seine</p>
                </div>

                <div className="sene-mousterian">
                    <GraphTilted id={111} data={this.state.data} circuit={this.state.circuits[2]} run={this.state.runs[1]} dim={50}></GraphTilted>

                    <GraphTilted id={116} data={this.state.data} circuit={this.state.circuits[2]} run={this.state.runs[6]} dim={50}></GraphTilted>
                    <p className="title">Séné, Moustérian</p>
                </div>

                <div className="new-taipei-city">
                    <GraphTilted id={112} data={this.state.data} circuit={this.state.circuits[4]} run={this.state.runs[1]} dim={50}></GraphTilted>

                    <GraphTilted id={117} data={this.state.data} circuit={this.state.circuits[4]} run={this.state.runs[7]} dim={50}></GraphTilted>

                    <GraphTilted id={118} data={this.state.data} circuit={this.state.circuits[4]} run={this.state.runs[8]} dim={30}></GraphTilted>

                    <p className="title">New Taipei City, Riverside</p>
                </div>
            </div>
        );
    }
}

export default Content;