import React, { useState } from 'react'
import { Typography, Container } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Delete from '@material-ui/icons/Delete'
import './App.sass'
import { useEffect } from 'react'
import { format, isYesterday, isToday } from 'date-fns'

const App = () => {
  const [data, setData] = useState([])

  async function fetchData() {
    let fecha
    let trueURL = ''
    let result = await fetch('http://localhost:5000/getNews')
    result = await result.json()
    result = result.map(res => {
      if (isToday(new Date(res.created_at))) {
        fecha = format(new Date(res.created_at), 'hh:mm a').toLowerCase()
      } else if (isYesterday(new Date(res.created_at))) {
        fecha = 'Yesterday'
      } else {
        fecha = format(new Date(res.created_at), 'MMM d').toLowerCase()
        fecha = fecha.charAt(0).toUpperCase() + fecha.slice(1)
      }
      if (res.url === null && res.story_url === null) {
        trueURL === ''
      } else {
        trueURL = res.url ? res.url : res.story_url
      }
      return { ...res, fecha: fecha, trueURL: trueURL }
    })
    result = result.filter(res => !(res.story_title === null && res.title === null))
    result = result.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
    setData(result)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const Gourl = url => {
    if (url === '') {
      alert('Invalid Url')
    } else {
      window.open(url, '_blank')
    }
  }
  const DeleteNews = async created_at => {
    let result = await fetch('http://localhost:5000/deleteNews', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ created_at })
    })
    result = await result.json()
    fetchData()
  }
  return (
    <div>
      <Container className='Container'>
        <Typography variant='h2'>HN Feed</Typography>
        <Typography variant='h6'>{'We <3 hacker news!'}</Typography>
      </Container>
      <div className='table'>
        <TableContainer>
          <Table aria-label='simple table' className='row'>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell onClick={() => Gourl(row.trueURL)}>
                    {row.story_title ? row.story_title : row.title} - <span>{row.author}</span> -
                  </TableCell>
                  <TableCell align='center' onClick={() => Gourl(row.trueURL)}>
                    {row.fecha}
                  </TableCell>
                  <TableCell
                    align='center'
                    className='delete'
                    title='Delete news'
                    onClick={() => DeleteNews(row.created_at)}
                  >
                    <Delete />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default App
