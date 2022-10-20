const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePlant)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deletePlant(){
    const nName = this.parentNode.childNodes[1].innerText
    const lName = this.parentNode.childNodes[3].innerText
    const pSafe = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deletePlant', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nickNameS': nName,
              'latinNameS': lName,
              'petSafeS': pSafe
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const nName = this.parentNode.childNodes[1].innerText
    const lName = this.parentNode.childNodes[3].innerText
    const pSafe = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nickNameS': nName,
              'latinNameS': lName,
              'petSafeS': pSafe,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}