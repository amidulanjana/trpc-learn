import React, { useEffect, useRef, useState } from 'react';
import { trpc } from './trpc';

function App() {

  const [companies,setCompanies] = useState<{ name: string;id: string;}[]>([])
  const companyNameRef = useRef<HTMLInputElement | null>(null)

  const getCompanies = async () => {
    var data = await trpc.company.query()
    const companyList = data.map(d => ({...d}))
    setCompanies(companyList)
  }

  const addCompany = () => {
    if(companyNameRef.current){
      trpc.createCompany.mutate({id: new Date().getTime().toString(), name:companyNameRef.current.value})
      getCompanies()
    }
  }

  useEffect(() => {
    getCompanies()
  },[])

  return (
    <div className="App">
      <section>
        <input type='text' placeholder='company' ref={companyNameRef}/>
        <button type='button' onClick={addCompany}>Add company</button>
      </section>
      {companies.map(c => <h3 key={c.id}>{c.name}</h3>)}
    </div>
  );
}

export default App;
