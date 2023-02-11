import Container from './container';
import Form from './form';
import InputField from './input-field';
import { useForm } from 'react-hook-form';

const Section = ({ title, children }) => {
  return (
    <div className='prose bg-light-blue-50 w-full max-w-[100%] p-5 rounded-md'>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const JoinPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Called onSubmit with data: ', data);
  };

  return (
    <Container className='prose my-10 md:my-20'>
      <h1>Join NZSE</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section title='Your Details'>
          <InputField
            type='text'
            name='firstName'
            validations={{ required: 'Please enter your first name ' }}
            label='First name'
            register={register}
          />
          <InputField
            type='text'
            name='surname'
            validations={{ required: 'Please enter your first name ' }}
            label='Surname'
            register={register}
          />
        </Section>
      </form>
    </Container>
  );
};

export default JoinPage;
