import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.action';

const AddTransformationTypePage = async ({params : {type}} : SearchParamProps) => {
  const { userId}  = auth();
  const transformation = transformationTypes[type];

  const user = await getUserById(userId as string);

  return (
    <>
    <Header 
      title={transformation.title}
      subtitle={transformation.subTitle}
    />
      <TransformationForm 
          action='Add'
          userId={user._id}
          type = {transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
      />
    </>
  )
}

export default AddTransformationTypePage