'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'

interface FormValues {
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
  const { register, handleSubmit, getValues } = useForm<FormValues>()
  const [numText, setNumText] = useState('')
  const [results, setResults] = useState<CalculationResult | null>(null)

  const calculate = () => {
    const ome = getValues('omePeopleNum') || 0
    const sukuname = getValues('sukunamePeopleNum') || 0
    const total = parseInt(numText) || 0
    const all = ome + sukuname

    if (all === 0 || total === 0) {
      setResults({ omeExam: 0, sukunameExam: 0, payExam: 0, changeExam: 0 })
      return
    }

    let sukunameExam = 0
    let omeExam = 0

    if (ome === 0) {
      sukunameExam = Math.ceil(total / sukuname / 100) * 100
    } else if (sukuname === 0) {
      omeExam = Math.ceil(total / ome / 100) * 100
    } else {
      sukunameExam = Math.floor((total * 0.8) / all / 100) * 100
      omeExam = Math.ceil((total - sukunameExam * sukuname) / ome / 100) * 100
    }

    const payExam = omeExam * ome + sukunameExam * sukuname
    const changeExam = Math.max(payExam - total, 0)

    setResults({ omeExam, sukunameExam, payExam, changeExam })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 6,
        px: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        多め ni ワリカン
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 360, mt: 4 }}>
        <InputBlock
          label="多めに払う人"
          icon="/fat.png"
          placeholder="人数を入力してください"
          register={register('omePeopleNum', { valueAsNumber: true })}
        />
        <InputBlock
          label="少なめに払う人"
          icon="/ojigi.png"
          placeholder="人数を入力してください"
          register={register('sukunamePeopleNum', { valueAsNumber: true })}
        />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              fontWeight: 600,
            }}
          >
            <img
              src="/yen.png"
              alt="合計金額"
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            合計金額
          </Typography>
          <TextField
            type="number"
            fullWidth
            value={numText}
            placeholder="金額を入力してください"
            onChange={(e) => setNumText(e.target.value)}
            inputProps={{ inputMode: 'numeric', min: 0 }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleSubmit(calculate)}
          sx={{
            mt: 3,
            width: '100%',
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            backgroundColor: '#EB6100',
            borderRadius: '30px',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#EB6100',
              boxShadow: 'none',
            },
          }}
        >
          計算する！
        </Button>
      </Box>

      {results && <ResultDisplay results={results} />}
    </Box>
  )
}

const InputBlock = ({
  label,
  icon,
  register,
  placeholder,
}: {
  label: string
  icon: string
  register: ReturnType<UseFormRegister<FormValues>>
  placeholder?: string
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="body1"
      sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 600 }}
    >
      <img
        src={icon}
        alt={label}
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
      {label}
    </Typography>
    <TextField
      type="number"
      fullWidth
      placeholder={placeholder}
      inputProps={{ min: 0 }}
      {...register}
      sx={{ backgroundColor: '#fff', borderRadius: 2 }}
    />
  </Box>
)

const ResultDisplay = ({ results }: { results: CalculationResult }) => (
  <Box
    sx={{
      mt: 5,
      mb: 6,
      width: '100%',
      maxWidth: 500,
      backgroundColor: '#f8f8f8',
      border: '2px solid #ddd',
      borderRadius: 3,
      p: 3,
    }}
  >
    {[
      { label: '多めに払う人', icon: '/fat.png', value: results.omeExam },
      {
        label: '少なめに払う人',
        icon: '/ojigi.png',
        value: results.sukunameExam,
      },
      { label: '支払金額', icon: '/yen.png', value: results.payExam },
      { label: 'おつり', icon: '/yen.png', value: results.changeExam },
    ].map((item, i) => (
      <Box key={i} sx={{ mb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            fontWeight: 600,
          }}
        >
          <img
            src={item.icon}
            alt={item.label}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          {item.label}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            backgroundColor: '#fff',
            border: '2px solid #ccc',
            borderRadius: 2,
            textAlign: 'center',
            py: 1,
            fontWeight: 'bold',
            color: '#EB6100',
          }}
        >
          {item.value.toLocaleString()}円
        </Typography>
      </Box>
    ))}
  </Box>
)
