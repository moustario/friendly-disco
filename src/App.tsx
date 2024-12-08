import { useState } from 'react'
import './App.css'

function App() {
  const [initialBudget, setInitialBudget] = useState(0)
  const [budget, setBudget] = useState<number | null>(null)
  const [expenses, setExpenses] = useState<any[]>([])


  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const newExpenses = [...expenses, { id: Date.now(), name: formData.get('name'), amount: formData.get('amount') }]

    setExpenses(newExpenses);
    updateBudget(newExpenses);
  };

  const updateBudget = (newExpenses: any[]) => {
    if (!initialBudget) return

    let newBudget = initialBudget;
    newExpenses.forEach(e => newBudget -= e.amount);
    setBudget(newBudget);
  }

  const startBudget = (budget: number) => {
    setInitialBudget(budget);
  }


  return (
    <>
      {budget != null && <h1>Remaining Budget : {budget}</h1>}
      <label>
        Initial Budget ?
        <input type="number" value={initialBudget} onChange={e => { startBudget(Number(e.target.value)); updateBudget(expenses) }} />
      </label>
      {!!initialBudget && <h2>Available per week: {Number(initialBudget / 4)}</h2>}
      <hr />
      <h2> New expense : </h2>
      <form onSubmit={handleSubmit} style={
        {
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly"
        }
      }>
        <input placeholder="Expense name" type="text" name="name" />
        <input placeholder="Expense amount" type="number" name="amount" />
        <button type="submit">Add expense</button>
      </form >
      <hr />
      <div style={
        {
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }
      }>
        {
          expenses.map(expense => <span key={expense.id}> {JSON.stringify(expense)} </span>)
        }
      </div>
    </>
  )
}

export default App
