import { useState, useEffect } from "react"
import axios from 'axios'

const Queries = ({ user, url }) => {
  const [queries, setQueries ] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const fetchQueries = async () => {
    const userId = user._id
    const fetchedQueries = await axios.get(`${url}/query/${userId}`)
    setQueries(fetchedQueries)
  }

  useEffect (() => {
    fetchQueries()    
  }, [])

  const markImportant = async (queryId) => {
    try {
      const token = localStorage.getItem("token")
      console.log("token: ", token);
      
      const response = await axios.patch(`${url}/${queryId}/important`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const isImportant = response.data.data.important
      console.log("is query important?",isImportant);
      
      setQueries(response.data.data)
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
        {showAll ? "Show only important" : "Show all"}
      </Button>

      {!loading && Array.isArray(queries) && queries.length !== 0 && (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell">Name</th>
                <th className="d-none d-sm-table-cell">Surname</th>
                <th className="d-none d-sm-table-cell">Amount (€)</th>
                <th>Email</th>
                <th>Status</th>
                <th className="d-none d-sm-table-cell">Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries
              // με φιλτερ γινεται το show all
                .filter(t => showAll || !t.processed)
                .map((query) => {
                  const participant = query.participant
                  return (
                    <tr key={query._id}>
                      <td className="d-none d-sm-table-cell">{participant?.name || 'No Name'}</td>
                      <td className="d-none d-sm-table-cell">{participant?.surname || 'No Surname'}</td>
                      <td className="d-none d-sm-table-cell">€{query.amount}</td>
                      <td>{participant?.email || 'No Email'}</td>
                      <td>{query.processed ? 'Processed' : 'Unprocessed'}</td>
                      <td className="d-none d-sm-table-cell">{new Date(query.createdAt).toLocaleString()}</td>
                      <td>
                        <Button
                          variant={query.processed ? 'warning' : 'success'}
                          onClick={() => markImportant(query._id)}
                        >
                          {query.processed ? 'Mark Unprocessed' : 'Send email & Mark Processed'}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}
export default Queries