import React, { useState, ChangeEvent } from "react";
import SupplierDataService from "../../services/SupplierService";
import { useForm, Controller } from "react-hook-form";


interface ISupplier  {
         id?: any | null,
         title: string,
         description: string,
         published?: boolean,
       }

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: {label: string; value: string };
}

const AddSupplier: React.FC = () => {
  //const { control, handleSubmit } = useForm<IFormInput>();


const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({

    });



      const onSubmit: SubmitHandler<IFormInput> = data => {
          console.log(data)
      };

  const initialSupplierState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [supplier, setSupplier] = useState<ISupplier>(initialSupplierState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = () => {
    var data = {
      title: supplier.title,
      description: supplier.description
    };

    SupplierDataService.create(data)
      .then((response: any) => {
        setSupplier({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newSupplier = () => {
    setSupplier(initialSupplierState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSupplier}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={supplier.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>



          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={supplier.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>



          <button onClick={saveSupplier} className="btn btn-success">
            Submit
          </button>
        </div>


      )}
    </div>
  );
};

export default AddSupplier;
