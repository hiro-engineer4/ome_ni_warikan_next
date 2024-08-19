'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormValues {
  num: number
  omePeopleNum: number
  sukunamePeopleNum: number
}

interface CalculationResult {
  omeExam: number
  sukunameExam: number
  payExam: number
  changeExam: number
}

export default function Calculation() {
  const { register, handleSubmit, watch } = useForm<FormValues>()
  const [results, setResults] = useState<CalculationResult | null>(null)

  const num = watch('num')
  const omePeopleNum = watch('omePeopleNum')
  const sukunamePeopleNum = watch('sukunamePeopleNum')

  const calculate: SubmitHandler<FormValues> = (data) => {
    const allPeopleNum =
      parseInt(data.omePeopleNum.toString()) +
      parseInt(data.sukunamePeopleNum.toString())

    const sukunameExam = Math.floor((data.num * 0.8) / allPeopleNum / 100) * 100
    const omeExam =
      Math.ceil(
        (data.num - sukunameExam * data.sukunamePeopleNum) /
          data.omePeopleNum /
          100,
      ) * 100
    const payExam =
      omeExam * data.omePeopleNum + sukunameExam * data.sukunamePeopleNum
    const changeExam = Math.max(payExam - data.num, 0)

    setResults({
      omeExam,
      sukunameExam,
      payExam,
      changeExam,
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        多め ni ワリカン
      </Typography>
      <Box
        sx={{ textAlign: 'center', mb: 4, maxWidth: '350px', width: '100%' }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              mb: 1,
            }}
          >
            <img
              src="/fat.png"
              alt="多めに払う人"
              style={{ marginRight: '8px' }}
            />
            多めに払う人
          </Typography>
          <TextField
            type="number"
            fullWidth
            InputProps={{ inputProps: { min: 1 } }}
            {...register('omePeopleNum', {
              valueAsNumber: true,
              required: true,
            })}
            defaultValue={1}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              mb: 1,
            }}
          >
            <img
              src="/ojigi.png"
              alt="少なめに払う人"
              style={{ marginRight: '8px' }}
            />
            少なめに払う人
          </Typography>
          <TextField
            type="number"
            fullWidth
            InputProps={{ inputProps: { min: 1 } }}
            {...register('sukunamePeopleNum', {
              valueAsNumber: true,
              required: true,
            })}
            defaultValue={1}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              mb: 1,
            }}
          >
            <img src="/yen.png" alt="合計金額" style={{ marginRight: '8px' }} />
            合計金額
          </Typography>
          <TextField
            type="number"
            fullWidth
            InputProps={{ inputProps: { min: 1 } }}
            {...register('num', { valueAsNumber: true, required: true })}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(calculate)}
          sx={{
            backgroundColor: '#EB6100',
            borderRadius: '50px 80px / 80px 50px',
            padding: '24px 80px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#EB6100',
              borderRadius: '60% 80% / 100% 80%',
            },
            mt: 2,
          }}
        >
          計算する！
        </Button>
      </Box>

      {results && num > 0 && omePeopleNum > 0 && sukunamePeopleNum > 0 && (
        <Box
          sx={{
            border: '3px solid #424242',
            borderRadius: '10px',
            p: 2,
            maxWidth: '500px',
            width: '100%',
            px: 10,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                mb: 1,
              }}
            >
              <img
                src="/fat.png"
                alt="多めに払う人"
                style={{ marginRight: '8px' }}
              />
              多めに払う人
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: '#424242',
                color: '#fff',
                p: 1,
                fontWeight: 'bold',
                border: '3px solid #424242',
                borderRadius: '10px',
              }}
            >
              <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>
                {results.omeExam.toLocaleString()}円
              </span>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                mb: 1,
              }}
            >
              <img
                src="/ojigi.png"
                alt="少なめに払う人"
                style={{ marginRight: '8px' }}
              />
              少なめに払う人
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: '#424242',
                color: '#fff',
                p: 1,
                fontWeight: 'bold',
                border: '3px solid #424242',
                borderRadius: '10px',
              }}
            >
              <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>
                {results.sukunameExam.toLocaleString()}円
              </span>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                mb: 1,
              }}
            >
              <img
                src="/yen.png"
                alt="合計金額"
                style={{ marginRight: '8px' }}
              />
              支払金額
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: '#424242',
                color: '#fff',
                p: 1,
                fontWeight: 'bold',
                border: '3px solid #424242',
                borderRadius: '10px',
              }}
            >
              <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>
                {results.payExam.toLocaleString()}円
              </span>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                mb: 1,
              }}
            >
              <img
                src="/yen.png"
                alt="合計金額"
                style={{ marginRight: '8px' }}
              />
              おつり
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: '#424242',
                color: '#fff',
                p: 1,
                fontWeight: 'bold',
                border: '3px solid #424242',
                borderRadius: '10px',
              }}
            >
              <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>
                {results.changeExam.toLocaleString()}円
              </span>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}
