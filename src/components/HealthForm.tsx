import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Activity, Apple, Calendar, Heart, Mail, Phone, User, Dumbbell, Brain, Leaf } from 'lucide-react';
import { calculateBMI, getBMICategory, cn } from '../lib/utils';

interface FormData {
  fullName: string;
  birthDate: string;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  weight: number;
  height: number;
  healthCondition: 'none' | 'diabetes' | 'menopause';
  hasAllergies: boolean;
  allergiesDescription?: string;
  usesMedication: boolean;
  medicationDescription?: string;
  diet: 'regular' | 'irregular' | 'wantToImprove';
  exercising: boolean;
  goal: 'weightLoss' | 'muscleMass' | 'lifeQuality';
  expectations: string;
}

export function HealthForm() {
  const [showResult, setShowResult] = useState(false);
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const hasAllergies = watch('hasAllergies');
  const usesMedication = watch('usesMedication');

  const onSubmit = (data: FormData) => {
    const bmi = calculateBMI(data.weight, data.height);
    setBmiResult(bmi);
    setShowResult(true);
    
    // Here you would integrate with Zapier
    console.log('Form submitted:', data);
  };

  if (showResult && bmiResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full mx-auto transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Resultado do seu IMC
            </h2>
            <div className="text-7xl font-bold text-green-500 animate-fade-in">
              {bmiResult}
            </div>
            <p className="text-2xl text-gray-600">
              Classificação: <span className="font-semibold">{getBMICategory(bmiResult)}</span>
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-inner">
              <h3 className="text-2xl font-bold text-green-700 mb-3">
                Seu Kit Grátis Saúde Evo chegou no seu email!
              </h3>
              <p className="text-lg text-green-600">
                Abra para descobrir os presentes secretos e bônus que te enviamos.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-6">
              Kit Saúde Evo
            </h1>
            <p className="text-2xl text-gray-600 mb-10">
              Preencha o Kit Saúde Evo para descobrir seu IMC e Ganhe Grátis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center space-y-4 text-green-600">
                  <Apple className="w-12 h-12" />
                  <span className="text-lg font-medium">Cardápios e receitas personalizados</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center space-y-4 text-green-600">
                  <Calendar className="w-12 h-12" />
                  <span className="text-lg font-medium">Cronograma completo de jejum e atividades</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center space-y-4 text-green-600">
                  <Activity className="w-12 h-12" />
                  <span className="text-lg font-medium">Vídeo treinos personalizados</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <User className="w-8 h-8 text-blue-500" />
                  Dados Pessoais
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    {...register('fullName', { required: true })}
                    className={cn(
                      "mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-shadow duration-200 group-hover:shadow-md",
                      errors.fullName && "border-red-500"
                    )}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                  <input
                    type="date"
                    {...register('birthDate', { required: true })}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-shadow duration-200 group-hover:shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                  <div className="mt-2 space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('gender', { required: true })}
                        value="male"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Masculino</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('gender', { required: true })}
                        value="female"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Feminino</span>
                    </label>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      className="pl-10 block w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-shadow duration-200 group-hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      {...register('phone', { required: true })}
                      className="pl-10 block w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-shadow duration-200 group-hover:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-blue-500" />
                  Avaliação Antropométrica
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
              </div>
              
              <div className="flex justify-center gap-8">
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('weight', { required: true, min: 30, max: 300 })}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-shadow duration-200 text-center font-medium text-lg"
                    placeholder="75.5"
                  />
                </div>

                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    {...register('height', { required: true, min: 100, max: 250 })}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-shadow duration-200 text-center font-medium text-lg"
                    placeholder="175"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <Brain className="w-8 h-8 text-blue-500" />
                  Histórico de Saúde e Alimentar
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Possui Diabetes ou Menopausa?
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('healthCondition')}
                        value="none"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('healthCondition')}
                        value="diabetes"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Diabetes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('healthCondition')}
                        value="menopause"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Menopausa</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Tem alergias ou restrições alimentares?
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('hasAllergies')}
                        value="true"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('hasAllergies')}
                        value="false"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                  </div>
                  {hasAllergies && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quais?</label>
                      <textarea
                        {...register('allergiesDescription')}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Utiliza medicação de uso contínuo?
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('usesMedication')}
                        value="true"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('usesMedication')}
                        value="false"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                  </div>
                  {usesMedication && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quais?</label>
                      <textarea
                        {...register('medicationDescription')}
                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-blue-500" />
                  Hábitos e Estilo de Vida
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Como você descreveria sua alimentação atual?
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('diet')}
                        value="regular"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Regular</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('diet')}
                        value="irregular"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Irregular</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('diet')}
                        value="wantToImprove"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Desejo melhorar</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Pratica atividades físicas?
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('exercising')}
                        value="true"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('exercising')}
                        value="false"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <Dumbbell className="w-8 h-8 text-blue-500" />
                  Objetivos e Expectativas
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1" />
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Qual o seu principal objetivo com o Kit Saúde Evo?
                  </label>
                  <div className="space-y-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('goal')}
                        value="weightLoss"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Perda de peso</span>
                    </label>
                    <br />
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('goal')}
                        value="muscleMass"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Ganho de Massa Magra</span>
                    </label>
                    <br />
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('goal')}
                        value="lifeQuality"
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-700">Melhora na qualidade de vida</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Quais são suas principais expectativas em relação ao plano alimentar?
                  </label>
                  <textarea
                    {...register('expectations')}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    placeholder="Descreva suas expectativas..."
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 px-8 rounded-xl text-xl font-semibold hover:from-blue-700 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Descobrir meu IMC
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}