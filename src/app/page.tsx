"use client"

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, mappedPlans } from '@/schemas/userSchema';
import { on } from 'events';

function Home() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(userSchema)
  });

  console.log(errors);

  const planOptions = Object.entries(mappedPlans).map(([key, value]) => {
    return (
      <option key={key} value={key}>
        {value}
      </option>
    );
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <label htmlFor="name">Name</label>
        <input type="text" id="name"
          {...register('name')}
        />
        {
          errors.name && <span>{errors.name.message}</span>
        }

        {/* Correo */}
        <label htmlFor="email">Email</label>
        <input type="text" id="email"
          {...register('email')}
        />
        {
          errors.email && <span>{errors.email.message}</span>
        }

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input type="text" id="password"
          {...register('password')}
        />
        {
          errors.password && <span>{errors.password.message}</span>
        }

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="text" id="confirmPassword"
          {...register('confirmPassword')}
        />
        {
          errors.confirmPassword && <span>{errors.confirmPassword.message}</span>
        }

        {/* dayOfBirth */}
        <label htmlFor="dayOfBirth">Birth</label>
        <input type="date" id="dayOfBirth"
          {...register('dayOfBirth')}
        />
        {
          errors.dayOfBirth && <span>{errors.dayOfBirth.message}</span>
        }

        {/* weight */}
        <label htmlFor="weight">Weight</label>
        <input type="text" id="weight"
          {...register('weigth')}
        />
        {
          errors.weigth && <span>{errors.weigth.message}</span>
        }

        {/* Plans */}
        <label htmlFor="plan">Plan</label>
        <select id="plan"
          {...register('plan')}
        >
          {planOptions}
        </select>
        {
          errors.plan && <span>{errors.plan.message}</span>
        }

        <button type="submit">
          Submit
        </button>

        <p>{JSON.stringify(watch(), null, 2)}</p>
      </form>
    </div>
  );
}

export default Home;