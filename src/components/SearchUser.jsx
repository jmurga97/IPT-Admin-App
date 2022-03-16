import React, { useRef } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";

const SearchUser = ({ users, setSearch }) => {
  const searchRef = useRef(null);

  const onHandleSearch = (input) => {
    input.replace(/\s+/g, "");
    if (input !== "") {
      setSearch(findUser(input));
    } else {
      setSearch(users);
    }
  };

  const findUser = (searchedId) => {
    if (users.length !== 0) {
      return users.filter((user) =>
        validateUser(user.userId.toString(), searchedId)
      );
    }
  };

  const validateUser = (id, searchedId) => id.includes(searchedId) ? true : false;

  return (
    <div className="users-header">
      <h1>Usuarios IPT</h1>
      <div className="input-field">
        <MdOutlinePersonSearch
          size="3rem"
          color="white"
          title="Buscar Usuario"
        />
        <input
          id="search"
          placeholder="Búsqueda por cédula"
          type="search"
          ref={searchRef}
          onChange={() => onHandleSearch(searchRef.current.value)}
          className="users-search"
        />
      </div>
    </div>
  );
};

export default SearchUser;
