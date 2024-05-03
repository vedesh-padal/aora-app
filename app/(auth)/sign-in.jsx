import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';


const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submit = async () => {
    if (form.email === '' || form.password === '')  {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      // set to global state using React context
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully")

      router.replace('/home')
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6 min-h-[83vh]'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e })}
            otherStyles='mt-7'
            keyBoardType='email-address'
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e })}
            otherStyles='mt-7'
          />
          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center gap-2 flex-row pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn