import styled from '@emotion/styled';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  DetailsStatistic,
  useStatisticOfMonthQuery,
} from '#/generated/schemas';
import {
  Alert,
  Card,
  Col,
  Form,
  Row,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { DatePicker } from '#/shared/components/common/DatePicker';
import { ArrowUpOutlined } from '@ant-design/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function getMonthDates(year: number, month: number) {
  const startDate = dayjs(`${year}-${month}-01`);
  const numberOfDays = startDate.daysInMonth();

  const dates = Array.from({ length: numberOfDays }, (_, index) =>
    startDate.add(index, 'day').format('YYYY-MM-DD'),
  );

  return dates;
}

const StatisticStyle = styled.div`
  .ant-form-item-required[title] {
    color: #000 !important;
  }

  .ant-statistic-content {
    color: #fff !important;
  }
`;

export function StatisticPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());
  const [quantity, setQuantity] = useState<DetailsStatistic[]>(
    getMonthDates(
      dayjs(selectedMonth).get('year'),
      dayjs(selectedMonth).get('month') + 1,
    ).map(
      item =>
      ({
        date: item,
        eventAmount: 0,
        serviceAmount: 0,
      } as any),
    ),
  );
  const { data, loading, refetch } = useStatisticOfMonthQuery({
    variables: {
      input: {
        month: dayjs(selectedMonth).get('month') + 1,
        year: dayjs(selectedMonth).get('year'),
      },
    },
    onCompleted: data => {
      setQuantity(
        [
          ...(data?.statisticOfMonth?.details?.map(item => ({
            date: item.date,
            eventNumber: item.eventNumber,
            serviceNumber: item.serviceNumber,
          })) || []),
          ...quantity.filter(
            item =>
              data?.statisticOfMonth?.details?.findIndex(
                i => i.date === item.date,
              ) === -1,
          ),
        ].sort((a, b) => dayjs(a.date).diff(dayjs(b.date))) || [],
      );
    },
  });
  const onSelectMonthChange = (date: any) => {
    setSelectedMonth(date);
    setQuantity(
      getMonthDates(dayjs(date).get('year'), dayjs(date).get('month') + 1)
        .map(
          item =>
          ({
            date: item,
            eventAmount: 0,
            serviceAmount: 0,
          } as any),
        )
        .sort((a, b) => dayjs(a.date).diff(dayjs(b.date))),
    );
  };
  useEffect(() => {
    if (selectedMonth) {
      refetch({
        input: {
          month: dayjs(selectedMonth).get('month') + 1,
          year: dayjs(selectedMonth).get('year'),
        },
      });
    }
  }, [selectedMonth]);

  const pieOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Biểu đồ thống kê doanh thu',
    },

    series: [
      {
        name: 'Doanh thu',
        data: [
          {
            name: 'Dịch vụ',
            y: data?.statisticOfMonth?.revenue?.service || 0,
            color: '#4361ee',
          },
          {
            name: 'Sự kiện',
            y: data?.statisticOfMonth?.revenue?.event || 0,
            color: '#e2a03f',
          },
        ],
      },
    ],
  };

  const quantityOptions = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Biểu đồ thống kê số lượng',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}',
      },
    },
    yAxis: {
      type: 'linear',
      title: {
        text: '',
      },
      lineWidth: 2,
    },
    legend: {
      enabled: true,
      verticalAlign: 'top',
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Dịch vụ',
        type: 'spline',
        data:
          quantity?.map(item => [
            Date.parse(dayjs(item?.date).format('YYYY-MM-DD')),
            item?.serviceNumber || 0,
          ]) ?? [],
        color: '#4361ee',
        animation: {
          duration: 5000,
        },
        lineWidth: 2,
        marker: {
          symbol: 'circle',
          color: '#4361ee',
        },
      },
      {
        name: 'Sự kiện',
        type: 'spline',
        data:
          quantity?.map(item => [
            Date.parse(dayjs(item?.date).format('YYYY-MM-DD')),
            item?.eventNumber || 0,
          ]) ?? [],

        color: '#e2a03f',
        animation: {
          duration: 5000,
        },
        lineWidth: 2,
        marker: {
          symbol: 'circle',
          color: '#e2a03f',
        },
      },
    ],
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (data: string) => dayjs(data)?.format('DD-MM-YYYY') ?? 'N/A',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'serviceNumber',
      key: 'serviceNumber',
      render: (serviceNumber: number) => serviceNumber ?? 0,
    },
    {
      title: 'Sự kiện',
      dataIndex: 'eventNumber',
      key: 'eventNumber',
      render: (eventNumber: number) => eventNumber ?? 0,
    },
  ];
  return (
    <StatisticStyle>
      <Typography.Title level={2}>THỐNG KÊ</Typography.Title>
      <Alert
        className={'my-4'}
        type={'info'}
        message={'Đây là thống kê  doanh thu và số lượng theo hàng tháng.'}
        showIcon
      ></Alert>
      <Row className={'border-md bg-[white] p-4'}>
        <Col span={24}>
          <Form.Item label={'Chọn tháng'} required>
            <DatePicker
              onChange={onSelectMonthChange}
              picker="month"
              defaultValue={dayjs(selectedMonth, 'YYYY-MM')}
            />
          </Form.Item>
        </Col>
        <Col span={24} className={'my-4'}>
          <Typography.Title level={3} className={'my-4'}>
            Thống kê doanh thu
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={24}>
              <Row gutter={[16, 16]}>
                <Col lg={12} md={24}>
                  <Card style={{ backgroundColor: '#4361ee' }}>
                    <Statistic
                      className={'text-white'}
                      title={
                        <Typography.Text className={'text-xl'}>
                          Dịch vụ
                        </Typography.Text>
                      }
                      value={data?.statisticOfMonth?.revenue?.service ?? 0}
                      suffix={'VND'}
                      prefix={<ArrowUpOutlined />}
                    />
                  </Card>
                </Col>
                <Col lg={12} md={24}>
                  <Card style={{ backgroundColor: '#e2a03f' }}>
                    <Statistic
                      className={'text-white'}
                      title={
                        <Typography.Text className={'text-xl'}>
                          Sự kiện
                        </Typography.Text>
                      }
                      value={data?.statisticOfMonth?.revenue?.event ?? 0}
                      suffix={'VND'}
                      prefix={<ArrowUpOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            </Col>
          </Row>
        </Col>
        <Col span={24} className={'my-4 w-full'}>
          <Typography.Title level={3}>Thống kê số lượng</Typography.Title>
          <Row className={'w-full'}>
            <Col span={24}>
              <HighchartsReact
                className={'w-full'}
                highcharts={Highcharts}
                options={quantityOptions}
              />
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={quantity}
                pagination={false}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </StatisticStyle>
  );
}
