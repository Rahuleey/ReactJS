const Button = props => {
  //  Write your code here.
  const {className, buttonText} = props
  return <button className={`button ${className}`}>{buttonText}</button>
}

const element = (
  <div className='bg-cont'>
    <div className='cont'>
      <h1 className='head'>Social Buttons</h1>
      <div>
        <Button buttonText='Like' className='like' />
        <Button buttonText='Comment' className='comment' />
        <Button buttonText='Share' className='share' />
      </div>
    </div>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
