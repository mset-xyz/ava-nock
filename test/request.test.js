import test from 'ava'
import request from 'request'
import { setupTests } from '../src'

setupTests()

test('using request', t => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request(
        {
          url:
            'https://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?fmt=json',
          headers: {
            // This always seems to get rate limited unless we give it a
            // different User-Agent.
            'User-Agent': 'ava-nock'
          }
        },
        (err, response, body) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(body))
          }
        }
      )
    }, 1000)
  }).then(data => {
    t.is(data.name, 'Nirvana')
  })
})
