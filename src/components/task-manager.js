import React, { useState } from 'react'
import ProgressBar from 'react-progressbar'

import useInterval from '../hooks/use-interval'

function checkIfIdle(server) {
  return server.task === null
}

function random() {
  // generate random number between 1 to 100
  return Math.floor(Math.random() * 100) + 1
}

function createTask() {
  return {
    id: Date.now() + random(),
    completed: 0,
  }
}

function TaskManager() {
  const [servers, setServers] = useState([
    {
      id: 0,
      task: null,
    },
  ])

  const [noOfTasks, setNoOfTasks] = useState(1)
  const [pendingTasks, setPendingTasks] = useState([])

  function createServer() {
    if (servers.length === 10) {
      window.alert('cannot create more servers. 10 is the limit')
      return
    }

    const newServer = {
      id: servers.length,
      task: null,
    }

    // spread it out in order to keep the state immutable
    setServers([...servers, newServer])
  }

  function removeServer(id) {
    if (servers.length === 1) {
      window.alert('minimum 1 server should exist')
      return
    }

    const matchIndex = servers.findIndex((server) => server.id === id)
    if (matchIndex === -1) {
      return
    }

    const match = servers[matchIndex]
    const isIdle = checkIfIdle(match)

    // spread it out to keep the state immutable
    if (isIdle) {
      setServers([...servers.slice(0, matchIndex), ...servers.slice(matchIndex + 1)])
    }
  }

  function handleInputChange(e) {
    setNoOfTasks(e.target.value)
  }

  function addTasks() {
    const tasks = Array(Number(noOfTasks))
      .fill(1)
      .map(() => {
        return createTask()
      })

    console.log({ tasks })

    setPendingTasks(tasks)
  }

  useInterval(() => {}, 1000)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <button onClick={createServer}>Create Server</button>
        <div style={{ marginTop: 20 }}>
          {servers.map((server) => (
            <div
              key={server.id}
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {server.id} → <button onClick={() => removeServer(server.id)}>Remove Server</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginLeft: 100 }}>
        <div>
          <h3>Pending tasks</h3>
          {pendingTasks.map((task) => (
            <div style={{ backgroundColor: '#ccc', marginTop: 8, marginBottom: 8 }}>
              <ProgressBar key={task.id} completed={task.completed} height={20} />
            </div>
          ))}
        </div>

        <div>
          <input type="number" placeholder="Type # of tasks" value={noOfTasks} onChange={handleInputChange} />
          <button onClick={addTasks}>Add tasks</button>
        </div>
      </div>
    </div>
  )
}

export default TaskManager
