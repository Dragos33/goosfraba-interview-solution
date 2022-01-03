import React, {Fragment} from 'react'
import {Element} from 'react-faux-dom'
import * as d3 from 'd3'
import './App.css'
import {useQuery, gql} from '@apollo/client'

const postsNumber = 2000
const POSTS_QUERY = gql`
	{
		allPosts(count: ${postsNumber}) {
			id
			title
			body
			published
			createdAt
			author {
				id
				firstName
				lastName
				avatar
			}
		}
	}
`

function App() {
	let graphData = [
		{
			country: 'Jan',
			value: 0,
		},
		{
			country: 'Feb',
			value: 0,
		},
		{
			country: 'Mar',
			value: 0,
		},
		{
			country: 'Apr',
			value: 0,
		},
		{
			country: 'May',
			value: 0,
		},
		{
			country: 'June',
			value: 0,
		},
		{
			country: 'July',
			value: 0,
		},
		{
			country: 'Aug',
			value: 0,
		},
		{
			country: 'Sept',
			value: 0,
		},
		{
			country: 'Oct',
			value: 0,
		},
		{
			country: 'Nov',
			value: 0,
		},
		{
			country: 'Dec',
			value: 0,
		},
	]
	const {data, loading, error} = useQuery(POSTS_QUERY)

	const plot = (chart, width, height) => {
		if (loading) return 'Loading...'
		if (error) return <pre>{error.message}</pre>

		//getting the number of posts for every month
		let Jan = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 1
		).length
		graphData[0].value = Jan

		let Feb = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 2
		).length
		graphData[1].value = Feb

		let Mar = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 3
		).length
		graphData[2].value = Mar

		let Apr = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 4
		).length
		graphData[3].value = Apr

		let May = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 5
		).length
		graphData[4].value = May

		let June = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 6
		).length
		graphData[5].value = June

		let July = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 7
		).length
		graphData[6].value = July

		let Aug = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 8
		).length
		graphData[7].value = Aug

		let Sept = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 9
		).length
		graphData[8].value = Sept

		let Oct = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 10
		).length
		graphData[9].value = Oct

		let Nov = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 11
		).length
		graphData[10].value = Nov

		let Dec = data.allPosts.filter(
			(eachPost) => new Date(parseInt(eachPost.createdAt)).getMonth() + 1 === 12
		).length
		graphData[11].value = Dec

		//creating the scales
		const xScale = d3
			.scaleBand()
			.domain(graphData.map((d) => d.country))
			.range([0, width])
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(graphData, (d) => d.value)])
			.range([height, 0])
		const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

		chart
			.selectAll('.bar')
			.data(graphData)
			.enter()
			.append('rect')
			.classed('bar', true)
			.attr('x', (d) => xScale(d.country))
			.attr('y', (d) => yScale(d.value))
			.attr('height', (d) => height - yScale(d.value))
			.attr('width', (d) => xScale.bandwidth())
			.style('fill', (d, i) => colorScale(i))

		chart
			.selectAll('.bar-label')
			.data(graphData)
			.enter()
			.append('text')
			.classed('bar-label', true)
			.attr('x', (d) => xScale(d.country) + xScale.bandwidth() / 2)
			.attr('dx', 0)
			.attr('y', (d) => yScale(d.value))
			.attr('dy', -6)
			.text((d) => d.value)

		const xAxis = d3.axisBottom().scale(xScale)

		chart
			.append('g')
			.classed('x axis', true)
			.attr('transform', `translate(0,${height})`)
			.call(xAxis)

		const yAxis = d3.axisLeft().ticks(5).scale(yScale)

		chart
			.append('g')
			.classed('y axis', true)
			.attr('transform', 'translate(0,0)')
			.call(yAxis)

		chart
			.select('.x.axis')
			.append('text')
			.attr('x', width / 2)
			.attr('y', 60)
			.attr('fill', '#000')
			.style('font-size', '25px')
			.style('text-anchor', 'middle')
			.text('Months')

		chart
			.select('.y.axis')
			.append('text')
			.attr('x', 0)
			.attr('y', 0)
			.attr('transform', `translate(-50, ${height / 2}) rotate(-90)`)
			.attr('fill', '#000')
			.style('font-size', '25px')
			.style('text-anchor', 'middle')
			.text('Number of Posts')

		const yGridlines = d3
			.axisLeft()
			.scale(yScale)
			.ticks(5)
			.tickSize(-width, 0, 0)
			.tickFormat('')

		chart.append('g').call(yGridlines).classed('gridline', true)
	}

	const drawChart = () => {
		const width = 800
		const height = 450

		const el = new Element('div')
		const svg = d3
			.select(el)
			.append('svg')
			.attr('id', 'chart')
			.attr('width', width)
			.attr('height', height)

		const margin = {
			top: 60,
			bottom: 100,
			left: 80,
			right: 40,
		}

		const chart = svg
			.append('g')
			.classed('display', true)
			.attr('transform', `translate(${margin.left},${margin.top})`)

		const chartWidth = width - margin.left - margin.right
		const chartHeight = height - margin.top - margin.bottom
		plot(chart, chartWidth, chartHeight)
		return el.toReact()
	}
	return drawChart()
}

export default App
