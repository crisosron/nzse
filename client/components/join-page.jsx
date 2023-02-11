import Container from './container';
import InputField from './input-field';
import { useForm } from 'react-hook-form';

const Section = ({ title, children }) => {
  return (
    <div className='prose bg-light-blue-50 w-full max-w-[100%] p-5 rounded-md my-10'>
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
            validations={{ required: 'Please enter your surname ' }}
            label='Surname'
            register={register}
          />
          <InputField
            type='date'
            name='dob'
            validations={{ required: 'Please enter your date of birth ' }}
            label='Date of birth'
            register={register}
          />
        </Section>

        <Section title='Address'>
          <InputField
            type='text'
            name='address'
            validations={{ required: 'Please enter your address' }}
            label='Street number and name'
            register={register}
          />
          <InputField type='text' name='suburb' label='Suburb' register={register} />
          <InputField type='text' name='city' label='City' register={register} />
          <InputField
            type='number'
            name='postcode'
            validations={{
              required: 'Please enter your postcode',
              minLength: { value: 4, message: 'Please enter a valid postcode ' },
              maxLength: { value: 4, message: 'Please enter a valid postcode ' }
            }}
            label='Post code'
            register={register}
          />
        </Section>

        <Section title='Your professional details'>
          <InputField type='text' name='institution' label='Institution' register={register} />
          <InputField type='text' name='department' label='Department' register={register} />
          {/* TODO: Need to implement 'select' type */}
          <InputField type='select' name='designation' label='Designation' register={register} />
        </Section>

        <Section title='Creating your account'>
          <p>
            Please enter your email address and a password to setup your account. Your account will
            be activated after successful payment.
          </p>
          <InputField
            type='text'
            name='emailAddress'
            validations={{ required: 'Please enter your email address' }}
            label='Email'
            register={register}
          />
          <InputField
            type='text'
            name='password'
            validations={{ required: 'Please enter your password' }}
            label='Password'
            register={register}
          />
          <InputField
            type='text'
            name='confirmPassword'
            validations={{ required: 'Please re-enter your password' }}
            label='Confirm password'
            register={register}
          />
        </Section>
      </form>
    </Container>
  );
};

export default JoinPage;
