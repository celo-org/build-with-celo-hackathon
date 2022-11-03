import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Text as TextSVG } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts'

function epsilonRound(num, zeros = 4) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
        this.center = [0, 0]
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let data = this.props.data
        let colors = this.props.dataColors
        const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                label: this.props.dataLabels,
                value,
                multiplier: this.props.dataMultipliers[index],
                svg: {
                    fill: colors[index],
                    onPress: () => console.log(this.props.dataLabels[index]),
                },
                key: `pie-${index}`,
            }))

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { pieCentroid, data } = slice;
                return (
                    <View key={"text" + index}>
                        <TextSVG
                            x={pieCentroid[0]}
                            y={pieCentroid[1] - 10}
                            fill={'white'}
                            textAnchor={'middle'}
                            alignmentBaseline={'middle'}
                            fontSize={24}
                            stroke={'black'}
                            strokeWidth={0.2}
                        >
                            {this.props.show ? this.props.round[index] !== 0 ? epsilonRound(data.value * data.multiplier, this.props.round[index]) : epsilonRound(data.value * data.multiplier) : "***"}
                        </TextSVG>
                        <TextSVG
                            x={pieCentroid[0]}
                            y={pieCentroid[1] + 10}
                            fill={'white'}
                            textAnchor={'middle'}
                            alignmentBaseline={'middle'}
                            fontSize={16}
                            stroke={'black'}
                            strokeWidth={0.2}
                        >
                            {this.props.show ? data.label[index] : "***"}
                        </TextSVG>
                    </View>

                )
            })
        }

        const changeColor = (label) => {

        }

        return (
            <>
                <PieChart outerRadius="100%" innerRadius="50%" style={{ height: this.props.size, width: this.props.size }} data={pieData} valueAccessor={({ item }) => item.value}>
                    <Labels />
                </PieChart>
            </>
        )
    }
}

export default Chart;