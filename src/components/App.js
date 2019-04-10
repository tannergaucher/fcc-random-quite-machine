import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Button, Box, Heading } from 'grommet'
import { Twitter } from 'grommet-icons'

const Styled = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const url = `http://quotes.stormconsultancy.co.uk/quotes.json`

export default function App() {
  const [quotes, setQuotes] = useState()
  const [random, setRandom] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url)
      setQuotes(result.data)
    }

    fetchData()
  }, [])

  return (
    <Styled>
      <Box id="quote-box">
        {quotes && (
          <Box
            animation="fadeIn"
            margin="large"
            pad="large"
            background=""
            elevation="large"
            style={{ maxWidth: '800px' }}
            round="medium"
          >
            <Heading level={2}>{quotes[random].quote}</Heading>
            <Heading level={4} color="dark-5">
              {quotes[random].author}
            </Heading>
            <Box direction="row" justify="between" wrap={true}>
              <Button
                id="new-quote"
                onClick={() => {
                  setRandom(
                    Math.floor(Math.random() * Math.floor(quotes.length))
                  )
                }}
                color="black"
                primary
                margin={{ vertical: 'small' }}
                label="New Quote"
              />
              <Button
                id="tweet-quote"
                label="Tweet Quote"
                color="black"
                margin={'small'}
                icon={<Twitter />}
                plain={true}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Styled>
  )
}
