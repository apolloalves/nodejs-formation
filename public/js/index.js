console.warn('Application in front end view')

    const confirmDeletion = ( event, form ) => {
        
        let decision = confirm("Deseja remover esta categoria?")
        event.preventDefault()
        
        if( decision )  form.submit()

    }

