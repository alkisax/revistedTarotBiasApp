import { useState, useEffect } from "react"
import { Button, Table } from 'react-bootstrap';
import axios from 'axios'

const Queries = ({ user, url }) => {
  const [queries, setQueries ] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const fetchQueries = async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }
    try {  
      // const userId = user._id
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${url}/query/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setQueries(res.data)
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user queries:", err);
    }
  }

  useEffect (() => {
    fetchQueries()    
  }, [])

  const markImportant = async (queryId) => {
    try {
    const token = localStorage.getItem("token")
    await axios.patch(
      `${url}/query/${queryId}/important`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    fetchQueries()
    } catch (error) {
      console.error("Error fetching queries:", error)
    }
  }

  const deleteQuery = async (queryId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this query?")
    if (!isConfirmed) {
      console.log("Query deletion cancelled");
      return; // Exit the function if the user cancels
    }
    try {
      const token = localStorage.getItem("token")
      await axios.delete(
        `${url}/query/${queryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchQueries()
    } catch (error) {
      console.error("Error fetching queries:", error)
    }
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && queries.length === 0 && <p>No queries found</p>}

      <Button variant="info" onClick={toggleShowAll} className="mb-3">
        {showAll ?  "Show only important" : "Show all queries"}
      </Button>

      {!loading && Array.isArray(queries) && queries.length > 0 && (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Question</th>
                <th className="d-none d-md-table-cell">Bias</th>
                <th>Response</th>
                <th className="d-none d-md-table-cell">Important</th>
                <th className="d-none d-md-table-cell">Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries
                .filter((q) => showAll || q.important)
                .map((query) => (
                  <tr key={query._id}>
                    <td>{query.question || 'No question'}</td>
                    <td className="d-none d-md-table-cell">{query.bias || 'N/A'}</td>
                    <td>{query.response || 'Pending...'}</td>
                    <td className="d-none d-md-table-cell">
                      {query.important ? 'Yes' : 'No'}
                    </td>
                    <td className="d-none d-md-table-cell">
                      {new Date(query.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <Button
                        variant={query.important ? 'warning' : 'success'}
                        onClick={() => markImportant(query._id)}
                      >
                        {query.important ? 'Unmark' : 'Mark Important'}
                      </Button>
                      <Button
                        className="mt-2"
                        variant="danger"
                        onClick={() => deleteQuery(query._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}
export default Queries