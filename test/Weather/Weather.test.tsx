import { render, screen } from '@testing-library/react';
import WeatherHeader from '@/components/WeatherApp/WeatherHeader';
describe('WeatherHeader', () => {
  test('renders weather data correctly', () => {
    const weather: WeatherData = {
      location: { name: 'Fargo', region: '', country: '', lat: 0, lon: 0, tz_id: '', localtime_epoch: 0, localtime: '' },
      current: { last_updated_epoch: 0, last_updated: '', temp_c: 0, temp_f: 75, is_day: 0, condition: { text: 'Sunny', icon: '', code: 0 }, wind_mph: 0, wind_kph: 0, wind_degree: 0, wind_dir: '', pressure_mb: 0, pressure_in: 0, precip_mm: 0, precip_in: 0, humidity: 0, cloud: 0, feelslike_c: 0, feelslike_f: 0, vis_km: 0, vis_miles: 0, uv: 0, gust_mph: 0, gust_kph: 0 },
    };
    
    const dayWeather: forecastday[] = [
      {
        day: { maxtemp_c: 0, maxtemp_f: 80, mintemp_c: 0, mintemp_f: 70, avgtemp_c: 0, avgtemp_f: 0, maxwind_mph: 0, maxwind_kph: 0, totalprecip_mm: 0, totalprecip_in: 0, totalsnow_cm: 0, avgvis_km: 0, avgvis_miles: 0, avghumidity: 0, daily_will_it_rain: 0, daily_chance_of_rain: 0, daily_will_it_snow: 0, daily_chance_of_snow: 0, condition: { text: '', icon: '', code: 0 }, uv: 0 },
        hour: [],
      },
    ];
    

    render(
      <WeatherHeader weather={weather} dayWeather={dayWeather} />
    );

    const locationName = screen.getByTestId('location-name');
    expect(locationName).toHaveTextContent('Fargo');

    const temperature = screen.getByText('75°');
    expect(temperature).toBeInTheDocument();

    const condition = screen.getByText('Sunny');
    expect(condition).toBeInTheDocument();

    const maxTemp = screen.getByText('H:80°');
    expect(maxTemp).toBeInTheDocument();

    const minTemp = screen.getByText('L:70°');
    expect(minTemp).toBeInTheDocument();
  });
});
