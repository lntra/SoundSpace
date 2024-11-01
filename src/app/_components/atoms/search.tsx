interface SearchBarProps {
    click : () => void;
    dark : boolean
}

const SearchBar = ( {click, dark} : SearchBarProps ) => {
    return <>
        <button onClick={click}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.4 36.6L31 28.2C30.6 27.8 30 27.6 29.4 27.6C31 25.6 32 22.8 32 20C32 13.4 26.6 8 20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C22.8 32 25.6 31 27.6 29.2C27.6 29.8 27.6 30.4 28.2 30.8L36.6 39.2C37 39.6 37.6 39.8 38 39.8C38.4 39.8 39 39.6 39.4 39.2C40.2 38.6 40.2 37.4 39.4 36.6ZM20 29C15 29 11 25 11 20C11 15 15 11 20 11C25 11 29 15 29 20C29 25 25 29 20 29Z" fill={`${dark ? "#a585cc" : "#53337B"} `}/>
            </svg>
        </button>
    </>
}

export default SearchBar;