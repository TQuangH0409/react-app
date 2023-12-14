import "./input.css"

function Input ({label , placeholder, icon, errorLogin = false}) {
    return (
        <div className="v-input-container">
            <span className="v-label">{label}</span>
            <input className="v-input" placeholder={placeholder} icon={icon}/>
        </div>
    )
}

export default Input