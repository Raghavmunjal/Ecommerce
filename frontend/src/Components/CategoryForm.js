import React from "react";

const CategoryForm = ({ handleSubmit, name, setName, loading }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary btn-raised my-4"
            disabled={loading || !name}
          >
            {loading ? <span>Saving...</span> : <span>Save</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
